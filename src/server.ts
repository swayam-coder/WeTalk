import { ApolloServer } from "apollo-server-express"
import express from "express"
import http from "http"
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import typeDefs from "./modules/schemas";
import resolvers from "./modules/resolvers";
import { config } from "./config"
import { UserModel, MessageModal } from "./database/models";
import { isAuthorized } from "./middlewares/authorization";
import { PubSub } from "graphql-subscriptions";
import { WebSocketServer } from "ws"
import { useServer } from 'graphql-ws/lib/use/ws'
import { formatError } from "./utils/error-formater";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./gql-shield/permissions";

const subscribers: (() => boolean)[] = [];
const status: (() => boolean)[] = []
const pubsub = new PubSub();

const onUpdates = <T>(fn: T, arr: T[]) => arr.push(fn);

const contextParams = {
    subscribers,
    pubsub,
    onUpdates,
    status,
    UserModel,
    MessageModal,
    isAuthorized
}

require("./database/connection");

async function serverStart(){
    const app = express();
    const httpServer = http.createServer(app);

    const typeDefswithPermissions = applyMiddleware(
        typeDefs, 
        permissions
    )

    const server = new ApolloServer({
        typeDefs: typeDefswithPermissions,
        resolvers,
        context: async ({ req, res }) => ({
            req, 
            res,
            ...contextParams
        }),
        formatError,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })

    await server.start()

    const { port, ...serverOptions } = config.serverOptions

    server.applyMiddleware({ app, ...serverOptions })
    
    app.get('/healthcheck', function(_req, res) {
        res.send("Server is healthy");
    })

    // await new Promise<void>(resolve => 
    //     // httpServer.listen({ port }, resolve)
    //     app.listen({ port }, resolve)
    // );

    const appServer = app.listen({ port }, () => {
        const wsServer = new WebSocketServer({
            path: serverOptions.path,
            server: appServer
        })
        
        useServer({ schema: typeDefs }, wsServer);
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })

    return { server, app };
};

serverStart();
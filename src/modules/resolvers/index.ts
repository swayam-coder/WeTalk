import MessageResolvers from "./message";
import AuthResolvers from "./auth";

const Resolvers = {
    Query: {
        ...MessageResolvers.Query, 
        ...AuthResolvers.Query
    },
    Mutations: { 
        ...MessageResolvers.Mutation,
        ...AuthResolvers.Mutation
    },
    Subscription: {
        ...MessageResolvers.Subscription,
        ...AuthResolvers.Subscription
    }
}

export default Resolvers;
import { Resolvers } from "gql-types";

const MessageResolvers: Resolvers = {
    Query: {
        messages: async (_parent: any, { limit }, { MessageModal: msg }) => {
            const messages = await msg.find().limit(limit);

            const response = messages.map(m => {
                return {
                    id: (m._id).toString(),
                    content: m.content,
                    sent: m.sent,
                    date: m.date,
                    created_by: m.created_by ? m.created_by.toString() : "",  // Doubt
                    isDeleted: (typeof m.isDeleted === "boolean") ? false : true
                }
            });

            return response
        },
        sendStatus: (_: any, __: any, { status }) => {
            status.forEach((fn) => fn());
            return null
        }
    },
    Mutation: {
        postMessage: async (_parent: any, { email, content }, { subscribers, MessageModal: msg, isAuthorized, req }) => {
            isAuthorized(req);

            if(!req.userid) {
                
            }

            

            const newMessage = {
                content,
                created_by: "fs"  // Doubt
            }

            const val = await msg.create(newMessage);
            subscribers.forEach((fn) => fn());
            return val._id;
        } 
    },
    Subscription: {
        messages: {
            subscribe: (_: any, __: any, { subscribers, pubsub, onUpdates, UserModel: user, MessageModal: msg }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onUpdates(() => pubsub.publish(channel, { messages }), subscribers);
                setTimeout(() => pubsub.publish(channel, { messages }), 0);  // this is for showing messages the first time the user visits
                return pubsub.asyncIterator(channel);
            }
        },
        status: {
            subscribe: (_: any, { username }, { status, pubsub, onUpdates, UserModel: user, MessageModal: msg }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onUpdates(() => pubsub.publish(channel, `${username} is typing...`), status);
                return pubsub.asyncIterator(channel);
            }
        }
    },
}

// We will need to add AsyncIterator<unknown, any, undefined> to SubscriptionSubscribeFn return-type, every time we generate types

export default MessageResolvers;
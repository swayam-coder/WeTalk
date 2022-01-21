import { ExpressContext } from "apollo-server-express";
import { PubSub } from "graphql-subscriptions";
import { ExtendedExpressRequest, MessageModalType, UserModalType } from "../types"

export interface MyContext extends ExpressContext {
    req: ExtendedExpressRequest
    subscribers: (() => boolean)[],
    status: (() => boolean)[],
    pubsub: PubSub,
    onUpdates: <T>(fn: T, arr: T[]) => number,
    UserModel: UserModalType,
    MessageModal: MessageModalType,
    isAuthorized: (req: ExtendedExpressRequest) => boolean
}
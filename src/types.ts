import { ReturnModelType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import { Message, User } from "./database/typegoose";
import { Request } from "express";
import mongoose from "mongoose";
import { ApolloError } from "apollo-server-core";

export type UserModalType = ReturnModelType<typeof User, BeAnObject>
export type MessageModalType = ReturnModelType<typeof Message, BeAnObject>
export interface ExtendedExpressRequest extends Request {
    userid: mongoose.Types.ObjectId
}
export interface Error {
    status: string,
    message: string,
    path?: string
}

export class MyGQLError extends ApolloError {
    constructor(message: string, code?: number) {
        super(message);
        this.status = code;
        Object.defineProperty(this, 'name', { value: 'MyError' });
    }
    readonly status: number | undefined
}
export interface importType {
    typedefs: string
    queries: string
    mutations: string
    subscriptions: string
}
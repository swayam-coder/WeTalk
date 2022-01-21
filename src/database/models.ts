import { User, Message } from "./typegoose";
import { getModelForClass } from "@typegoose/typegoose";

export const UserModel = getModelForClass(User);
export const MessageModal = getModelForClass(Message);
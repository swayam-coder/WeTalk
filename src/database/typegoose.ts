import { pre, prop, Ref } from "@typegoose/typegoose";
import mongoose  from "mongoose";
import { config } from "../config"

export class User {
    @prop({ required: true })
    public email: string

    @prop({ required: true, match: config.passwordRegex })
    public password: string

    @prop({ required: true, ref: () => Message })
    public messages: Ref<Message>[]

    @prop({ default: new Date() })
    public date: Date
}

// @pre<User>('save', function() {

// })

@pre<Message>('save', function() {
    this.date = new Date().toLocaleString();
    this.sent = true,
    this.isDeleted = false
})

export class Message {
    @prop({ required: true })
    content: string

    @prop()   // string should match a regular expression either use a built in feature or validator...
    public date: string

    @prop()
    public sent: boolean

    @prop({ required: true, ref: () => User })
    public created_by: Ref<User>

    @prop() 
    public isDeleted: mongoose.Types.ObjectId | boolean
}

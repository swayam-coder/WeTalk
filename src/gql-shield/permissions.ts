import { and, shield } from "graphql-shield";
import * as rules from "./rules";

export const permissions = shield({
    Query: {
        messages: rules.isAuthenticated,
        sendStatus: and(rules.isEmail, rules.isAuthenticated)
    },
    Mutation: {
        postMessage: and(rules.isEmail, rules.isAuthenticated),
        login: rules.isLoginValidated
    },
    Subscription: {
        messages: rules.isAuthenticated,
        status: and(rules.isEmail, rules.isAuthenticated)
    }
})
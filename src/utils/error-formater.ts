import { ApolloError, ValidationError } from "apollo-server-core";
import { GraphQLError } from "graphql";
import { HttpError } from "http-errors-enhanced"
import { v4 } from "uuid";
import { MyGQLError } from "src/types";
import { ValidationError as YupValidationError } from "yup"

export function formatError(e: GraphQLError) {
    if (e.originalError instanceof ApolloError) {
        return e
    }

    if(e.originalError instanceof HttpError) {
        return new MyGQLError(e.originalError.message, e.originalError.status);
    }
    
    if(e.originalError instanceof YupValidationError) {
        e.originalError.errors.map((err) => {
            return new ValidationError(err)
        })
    }

    const gid = v4();
    console.log(e.originalError?.message, `:${gid}`);
    return new GraphQLError(`Internal Server Error: ${gid}`);
}
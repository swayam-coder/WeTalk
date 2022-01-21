import { MutationLoginArgs } from "gql-types";
import { MyContext } from "src/modules/contextType";
import loginInput from "src/validations/auth";
import { UserInputError } from "apollo-server-core";
import { ValidationError as YupValidationError } from "yup";
import { HttpError } from "http-errors-enhanced";

export async function sanitizeLoginRequest(resolve: any, root: any, args: MutationLoginArgs, context: MyContext, info: any) {
    const { email, password } = args

    if(email.trim() === '' && password.trim() === '') {  // this wil be true for an empty string or a blank space filled string 
        return new UserInputError("Empty inputs not accepted")
    }

    try {
        await loginInput.validate(args)
        return resolve(root, args, context, info);
    } catch (error) {
        if(error instanceof YupValidationError) {
            return error
        }
        return new HttpError(500, "Internal Server Error");
    }
}
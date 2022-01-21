import { rule } from "graphql-shield"
import { returnPublicKeyPEM } from "src/certs/keys";
import JWT from "jsonwebtoken"
import { checkJWTErrorType } from "src/utils/checkErrorTypes";
import { AuthenticationError, UserInputError } from "apollo-server-core";
import { MyContext } from "src/modules/contextType";
import loginInput from "src/validations/auth";
import { ValidationError as YupValidationError } from "yup";
import { HttpError } from "http-errors-enhanced";
import { MutationLoginArgs } from "gql-types";
import { emailValidate } from "../validations/message";

export const isAuthenticated = rule("auth-rule")(async (_parent: any, _args: any, context: MyContext, _info: any) => {
    const token = (context.req.cookies.access_token as string).split(" ")[1];

    const publickey = await returnPublicKeyPEM();

    if(token) { 
        try {
            const result = JWT.verify(token, publickey);
            context.req.userid = result.id;
            return true;
        } catch (error: any) {
            return checkJWTErrorType(error);
        }
    } else {
        return new AuthenticationError("Your aren't logged in..maybe your session ended. Please login again");
    }
})

export const isLoginValidated = rule("validation-rule")(async (_parent: any, args: MutationLoginArgs, _context: MyContext, _info: any) => { 
    const { email, password } = args

    if(email.trim() === '' && password.trim() === '') {  // this wil be true for an empty string or a blank space filled string 
        return new UserInputError("Empty inputs not accepted")
    }

    try {
        loginInput.validateSync(args)
        return true;
    } catch (error) {
        if(error instanceof YupValidationError) {
            return error
        }
        return new HttpError(500, "Internal Server Error");
    }
})

export const isEmail = rule("check-email")((_parent: any, args: any, _context: MyContext, _info: any) => {
    const { email } = args;

    try {
        emailValidate.validateSync(email)
        return true;
    } catch (error) {
        if(error instanceof YupValidationError) {
            return error
        }
        return new HttpError(500, "Internal Server Error");
    }
})

// export const isValidated = inputRule()(() => loginInput, { abortEarly: false })  
/* Not using inputRule for more control over validation */
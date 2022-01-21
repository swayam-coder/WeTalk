import { AuthenticationError } from "apollo-server-core";
import JWT, { JsonWebTokenError } from "jsonwebtoken"
import { returnPublicKeyPEM } from "src/certs/keys";
import { checkJWTErrorType } from "src/utils/checkErrorTypes";

export async function isAuthorized(resolve: any, root: any, args: any, context: any, info: any) {
    const token = (context.req.cookies.access_token as string).split(" ")[1];

    const publickey = await returnPublicKeyPEM();
    if(token) {
        try {
            const result = JWT.verify(token, publickey);
            context.req.userid = result.id;
            return resolve(root, args, context, info);
        } catch (error: any) {
            // if(error instanceof JsonWebTokenError) {
            //     return checkJWTErrorType((error.name as string))
            // } else {
            //     return new Error("Internal Server Error");
            // }
            return checkJWTErrorType(error)
        }
    } else {
        return new AuthenticationError("User not autheticated. Plz login or register.");
    }
}
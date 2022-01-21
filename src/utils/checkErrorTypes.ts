import { ForbiddenError, AuthenticationError } from "apollo-server-core"
import { InternalServerError } from "http-errors-enhanced"
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken"

export function checkJWTErrorType(error: Error) {
    if(error instanceof TokenExpiredError || error instanceof NotBeforeError) {
        return new AuthenticationError("Something unexpected happened while logging in. Plz try login again.")
    } else if(error instanceof JsonWebTokenError) {  
        return new ForbiddenError("You aren't authorized/allowed to view this page or resource!") // This error will show if the secrets(here public key) have been changed or the user has been blacklisted  
    } else {
        return new InternalServerError("Internal Server Error.")
    }
}

/* TokenExpiredError and NotBeforeError classes extend from class JsonWebTokenError so "error instanceof JsonWebTokenError" will return 
true for both token expired error and not before error also but we dont want that we want to show different messages for these erros as 
compared to JsonWebTokenError, so we need to check these errors before JsonWebToken error, hence the order of the above if else statement 
must not be changed. */
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken"
import { Resolvers } from "gql-types";
import { config } from "src/config/auth";
import { returnPrivateKeyPEM } from "../../certs/keys";
import cookie from "cookie";
import mongoose from "mongoose"

const AuthResolvers: Resolvers = {
    Mutation: {
        login: async (_: any, { email, password }, { UserModel, res }) => {
            const result = validateUserloginInfo({ email, password });

            if(!result) {
                
            }

            const salt = await bcrypt.genSalt(config.saltRounds);
            const hashedpassword = bcrypt.hash(password, salt);

            const user = await UserModel.create({
                email,
                password: hashedpassword
            })

            const secret = await returnPrivateKeyPEM();

            const token = JWT.sign({ id: user._id, email }, secret, { expiresIn: '1h', algorithm: 'RS256' });

            res.setHeader('Set-Cookie', cookie.serialize('access_token', `Bearer ${token}`, config.cookieoptions));

            return {
                token,
                email
            }
        }
    },
}

export default AuthResolvers;
export const config = {  // Record<string, any> means key is of tring type and value is of any type
    passwordRegex: new RegExp(/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/),
    saltRounds: 10,
    cookieoptions: {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 60 * 60 * 24,  // always use maxAge instead of expires as expires is deprecated and most browsers ignore expires if both maxAge and expires are specified
        // domain: "",
        // path: "",
        // encode: 
    },
    claimset: {
        issuer: "Swayam's Url Shortener",
        audience: `${process.env.VERCEL_URL}`,
        maxTokenAge: "1h",
        algorithms: ["ES256"]
    }
}
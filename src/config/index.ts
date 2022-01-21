export const config = {  // Record<string, any> means key is of tring type and value is of any type
    serverOptions: {
        port: process.env.PORT ?? 4000,
        cors: {
            credentials: true,
            origin: ["http://localhost:3000"],
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,  // ??
            optionsSuccessStatus: 204
        },
        disableHealthCheck: true,
        path: "/swayam14022002"
    },
    url: "http://localhost:3000",
    port: process.env.PORT ?? 4000,
    dbUrl: "mongodb://localhost:27017/graphql-chat",
    mygraphqlPath: "/swayam14022002"
}

// Password Criteria
// 8 characters length
// 2 letters in Upper Case
// 1 Special Character (!@#$&*)
// 2 numerals (0-9)
// 3 letters in Lower Case

// Is Record<string, T> same as index signature?
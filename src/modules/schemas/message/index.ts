export const typedefs = `
    type Message {
        id: String!
        content: String!
        date: String!
        sent: Boolean!
        created_by: String!
        isDeleted: Boolean!
    }
`;

export const queries = `
    messages(limit: Int!): [Message!]
`;

export const mutations = `
    postMessage(email: String!, content: String!): ID!
`;

export const subscriptions = `
    messages: [Message!]
`;
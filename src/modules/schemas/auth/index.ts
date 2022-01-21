export const typedefs = `
type User {
    token: String!
    email: String!
}
`;

export const queries = ``;

export const mutations = `
    login(email: String!, password: String!): User!
`;

export const subscriptions = ``;

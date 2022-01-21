export const SUBSCRIBE_MESSAGES = `
    subscription {
        messages {
            id,
            user, 
            content
        }
    }
`;

export const SEND_MESSAGE = `
    mutation($email: String!, $content: String!) {
        postMessage(email: $email, content: $content)
    }
`;

export const SUBSCRIBE_STATUS = `
    subscription($email: String!) {
        status(email: $email);
    }
`

export const SEND_STATUS = `
    query($email: String!) {
        sendStatus(email: $email)
    }
`
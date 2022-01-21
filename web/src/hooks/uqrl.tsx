import { useSubscription, useQuery, useMutation } from "urql"

export function useMessageSub(SUBSCRIBE_MESSAGE: string) {
    return useSubscription({
        query: SUBSCRIBE_MESSAGE
    })
}

export function useStatusSub(SUBSCRIBE_STATUS: string) {
    return useSubscription({
        query: SUBSCRIBE_STATUS
    })
}

export function useMsgMutation(SEND_MESSAGE: string) {
    return useMutation(SEND_MESSAGE);
}

export function useStatusQuery(SEND_STATUS: string) {
    return useQuery({
        query: SEND_STATUS,
        pause: true
    })
}
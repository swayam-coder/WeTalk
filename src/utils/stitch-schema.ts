import { importType } from "../types";

const types: string[] = [];
const queries: string[] = [];
const mutations: string[] = [];
const subscriptions: string[] = [];

export function stitchSchema (schemas: importType[]) {
    schemas.map((s) => {
        types.push(s.typedefs)
        queries.push(s.queries)
        mutations.push(s.mutations)
        subscriptions.push(s.subscriptions)
    })

    return {
        types,
        queries,
        mutations,
        subscriptions
    }
}
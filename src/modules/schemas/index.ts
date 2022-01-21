import * as message from "./message";
import * as auth from "./auth";
import * as status from "./status";
import { buildSchema } from "graphql";
import { importType } from "../../types";
import { stitchSchema } from "src/utils/stitch-schema";

const schemas: importType[] = [message, auth, status];

const { types, queries, mutations, subscriptions } = stitchSchema(schemas);

export default buildSchema(`
  type Subscription {
    ${subscriptions.join('\n')}
  }
  ${types.join('\n')}
  type Query {
    ${queries.join('\n')}
  }
  type Mutation {
    ${mutations.join('\n')}
  }
`);
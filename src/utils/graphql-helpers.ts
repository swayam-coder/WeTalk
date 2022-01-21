import { loadDocuments } from "@graphql-tools/load"
import { CodeFileLoader } from "@graphql-tools/code-file-loader"
import { buildSchema } from "graphql"
import { gqlPluckFromCodeStringSync } from "@graphql-tools/graphql-tag-pluck"
import fs from "fs"

export async function generateSchema() {
    return await loadDocuments('./modules/index.ts', {  // './src/**/graphql/*.ts'
        loaders: [
            new CodeFileLoader()
        ],
    }) 
}

export function DocumentNodeToGraphQLSchema(filePath: string) {
    let schema: string = '';
    gqlPluckFromCodeStringSync(filePath, fs.readFileSync(filePath, 'utf8')).map((p) => {
        schema = schema + p.body
    })
    return buildSchema(schema)
}

// buildschema and print schema from graphql
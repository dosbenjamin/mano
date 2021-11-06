import { GraphQLClient } from "graphql-request"

const graphQLClient = new GraphQLClient(process.env.FAUNA_URL as string, {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_SECRET}`,
  },
})

export default graphQLClient

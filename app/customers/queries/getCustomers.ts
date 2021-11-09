import { GraphQLResult } from "app/types/GraphQL"
import db from "db"
import { gql } from "graphql-request"
import { Customer } from "__generated__/graphql"

const getCustomers = async () => {
  const {
    customers,
  }: {
    customers: GraphQLResult<Customer[]>
  } = await db.request(
    gql`
      query GetCustomers {
        customers {
          data {
            id: _id
            name
            email
          }
        }
      }
    `
  )

  return customers.data
}

export default getCustomers

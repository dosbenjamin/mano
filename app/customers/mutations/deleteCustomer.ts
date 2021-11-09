import db from "db"
import { gql } from "graphql-request"

const deleteCustomer = async (id: string) => {
  await db.request(
    gql`
      mutation RemoveCustomer($id: ID!) {
        deleteCustomer(id: $id) {
          name
          email
          phone
          street
          number
          zip
          city
          country
        }
      }
    `,
    { id }
  )
}

export default deleteCustomer

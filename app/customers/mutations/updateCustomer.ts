import db from "db"
import { gql } from "graphql-request"
import { CustomerInput } from "__generated__/graphql"

const updateCustomer = async ({ id, data }: { id: string; data: CustomerInput }) => {
  return db.request(
    gql`
      mutation UpdateCustomer($id: ID!, $data: CustomerInput!) {
        updateCustomer(id: $id, data: $data) {
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
    {
      id,
      data: { ...data },
    }
  )
}

export default updateCustomer

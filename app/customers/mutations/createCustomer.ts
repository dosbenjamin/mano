import db from "db"
import { gql } from "graphql-request"
import { CustomerInput } from "__generated__/graphql"

const createCustomer = async (data: CustomerInput) => {
  return db.request(
    gql`
      mutation CreateCustomer($data: CustomerInput!) {
        createCustomer(data: $data) {
          id: _id
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
      data: { ...data },
    }
  )
}

export default createCustomer

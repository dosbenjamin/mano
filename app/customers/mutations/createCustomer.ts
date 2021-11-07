import { gql } from "graphql-request"
import db from "../../../db"

const createCustomer = async (input) => {
  return db.request(
    gql`
      mutation CreateCustomer($data: CustomerInput!) {
        createCustomer(data: $data) {
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
      data: { ...input },
    }
  )
}

export default createCustomer

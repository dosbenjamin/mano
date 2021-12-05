import db from "db"
import { gql } from "graphql-request"
import type { CustomerInput } from "../types"

const createCustomer = async (data: CustomerInput) => {
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
    { data }
  )
}

export default createCustomer

import db from "db"
import { gql } from "graphql-request"
import type { CustomerData } from "../types"

const getCustomer = async (id: string) => {
  if (!id) return

  const { findCustomerByID: customer } = await db.request<{
    findCustomerByID: CustomerData
  }>(
    gql`
      query GetCustomer($id: ID!) {
        findCustomerByID(id: $id) {
          id: _id
          name
          phone
          email
          street
          number
          city
          zip
          country
        }
      }
    `,
    { id }
  )

  return customer
}

export default getCustomer

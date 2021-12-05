import db from "db"
import { gql } from "graphql-request"
import type { CustomerData } from "../types"

const getCustomers = async () => {
  const { customers } = await db.request<{
    customers: { data: CustomerData[] }
  }>(
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

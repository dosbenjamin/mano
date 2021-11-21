import db from "db"
import { gql } from "graphql-request"
import type { CustomerData } from "../types"

const getCustomers = async () => {
  const {
    customers,
  }: {
    customers: { data: CustomerData[] }
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

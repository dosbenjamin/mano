import { CustomerData } from "app/customers/types"
import db from "db"
import { gql } from "graphql-request"
import type { EstimateData } from "../types"

const getEstimateCustomers = async (id: string) => {
  const { findEstimateByID: estimate, customers } = await db.request<{
    findEstimateByID: EstimateData
    customers: { data: CustomerData[] }
  }>(
    gql`
      query getEstimateCustomers($id: ID!) {
        findEstimateByID(id: $id) {
          id: _id
          description
          priceWithoutVat
          priceWithVat
          creationDate
          expirationDate
          customer {
            id: _id
          }
          services {
            description
            quantity
            vat
            priceWithoutVat
            priceWithVat
            unitPrice
          }
        }
        customers {
          data {
            id: _id
            name
          }
        }
      }
    `,
    { id }
  )

  return { estimate, customers: customers.data }
}

export default getEstimateCustomers

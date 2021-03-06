import db from "db"
import { gql } from "graphql-request"
import type { EstimateData } from "../types"

const getEstimate = async (id: string) => {
  const { findEstimateByID: estimate } = await db.request<{
    findEstimateByID: EstimateData
  }>(
    gql`
      query GetEstimate($id: ID!) {
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
      }
    `,
    { id }
  )

  return estimate
}

export default getEstimate

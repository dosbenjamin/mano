import db from "db"
import { gql } from "graphql-request"
import type { EstimateData } from "../types"

const getEstimate = async (id: string) => {
  const {
    findEstimateByID,
  }: {
    findEstimateByID: EstimateData
  } = await db.request(
    gql`
      query GetEstimate($id: ID!) {
        findEstimateByID(id: $id) {
          id: _id
          description
          priceWithoutVat
          priceWithVat
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

  return { ...findEstimateByID }
}

export default getEstimate

import db from "db"
import { gql } from "graphql-request"
import type { EstimateInput } from "../types"

const updateEstimate = async ({
  id,
  data: { description, priceWithVat, priceWithoutVat, customer, services },
}: {
  id: string
  data: EstimateInput
}) => {
  return db.request(
    gql`
      mutation UpdateEstimate($id: ID!, $data: EstimateInput!) {
        updateEstimate(id: $id, data: $data) {
          description
          priceWithVat
          priceWithoutVat
          services {
            description
            quantity
            vat
            unitPrice
            priceWithVat
            priceWithoutVat
          }
        }
      }
    `,
    {
      id,
      data: {
        description,
        priceWithVat,
        priceWithoutVat,
        services,
        customer: {
          connect: customer,
        },
      },
    }
  )
}

export default updateEstimate

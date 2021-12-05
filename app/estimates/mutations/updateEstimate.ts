import db from "db"
import { gql } from "graphql-request"
import type { EstimateInput } from "../types"

const updateEstimate = async ({
  id,
  data: { customer, ...rest },
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
          creationDate
          expirationDate
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
        customer: {
          connect: customer,
        },
        ...rest,
      },
    }
  )
}

export default updateEstimate

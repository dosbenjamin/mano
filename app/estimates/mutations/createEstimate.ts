import db from "db"
import { gql } from "graphql-request"
import type { EstimateInput } from "../types"

const createEstimate = async ({ customer, ...rest }: EstimateInput) => {
  await db.request(
    gql`
      mutation CreateEstimate($data: EstimateInput!) {
        createEstimate(data: $data) {
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
      data: {
        customer: {
          connect: customer,
        },
        ...rest,
      },
    }
  )
}

export default createEstimate

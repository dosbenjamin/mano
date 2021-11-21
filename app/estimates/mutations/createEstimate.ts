import db from "db"
import { gql } from "graphql-request"
import type { EstimateInput } from "../types"

const createEstimate = async ({
  description,
  priceWithVat,
  priceWithoutVat,
  customer,
  services,
}: EstimateInput) => {
  await db.request(
    gql`
      mutation CreateEstimate($data: EstimateInput!) {
        createEstimate(data: $data) {
          description
          priceWithVat
          priceWithoutVat
          services {
            data {
              description
              quantity
              vat
              unitPrice
              priceWithVat
              priceWithoutVat
            }
          }
        }
      }
    `,
    {
      data: {
        description,
        priceWithVat,
        priceWithoutVat,
        customer: {
          connect: customer,
        },
        services: {
          create: services,
        },
      },
    }
  )
}

export default createEstimate

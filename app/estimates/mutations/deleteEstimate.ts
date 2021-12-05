import db from "db"
import { gql } from "graphql-request"

const deleteEstimate = async (id: string) => {
  await db.request(
    gql`
      mutation DeleteEstimate($id: ID!) {
        deleteEstimate(id: $id) {
          description
          priceWithVat
          priceWithoutVat
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
}

export default deleteEstimate

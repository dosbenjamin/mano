import db from "db"
import { gql } from "graphql-request"
import type { EstimateData } from "../types"

const getEstimates = async () => {
  const {
    estimates,
  }: {
    estimates: { data: EstimateData[] }
  } = await db.request(
    gql`
      query GetEstimates {
        estimates {
          data {
            id: _id
            customer {
              name
            }
          }
        }
      }
    `
  )

  return estimates.data
}

export default getEstimates

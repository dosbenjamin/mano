import db from "db"
import { gql } from "graphql-request"
import type { EstimateData } from "../types"

const getEstimates = async () => {
  const { estimates } = await db.request<{
    estimates: { data: EstimateData[] }
  }>(
    gql`
      query GetEstimates {
        estimates {
          data {
            id: _id
            customer {
              name
              email
            }
          }
        }
      }
    `
  )

  return estimates.data
}

export default getEstimates

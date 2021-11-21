import type { CustomerData } from "app/customers/types"
import type { Estimate, Service } from "__generated__/graphql"

export type EstimateInput = Omit<Estimate, "customer"> & {
  customer: string
  services: Service[]
}

export type EstimateData = Estimate & {
  id: string
  customer: CustomerData
  services: { data: Service[] }
}

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Customer = {
  __typename?: "Customer"
  city?: Maybe<Scalars["String"]>
  country?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  estimates: Array<Maybe<Estimate>>
  name: Scalars["String"]
  number?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  street?: Maybe<Scalars["String"]>
  vat?: Maybe<Scalars["String"]>
  zip?: Maybe<Scalars["String"]>
}

export type Estimate = {
  __typename?: "Estimate"
  customer: Customer
  description?: Maybe<Scalars["String"]>
  priceWithVat: Scalars["Float"]
  priceWithoutVat: Scalars["Float"]
  services: Array<Service>
}

export type Query = {
  __typename?: "Query"
  customers: Array<Maybe<Customer>>
  estimates: Array<Maybe<Estimate>>
}

export type Service = {
  __typename?: "Service"
  description: Scalars["String"]
  estimate: Estimate
  priceWithVat: Scalars["Float"]
  priceWithoutVat: Scalars["Float"]
  quantity: Scalars["Int"]
  unitPrice: Scalars["Float"]
  vat: Scalars["Float"]
}

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
  createdAt: Scalars["String"]
  email: Scalars["String"]
  estimate: Array<Maybe<Estimate>>
  id: Scalars["String"]
  name: Scalars["String"]
  number?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  street?: Maybe<Scalars["String"]>
  updatedAt: Scalars["String"]
  vat?: Maybe<Scalars["String"]>
  zip?: Maybe<Scalars["String"]>
}

export type CustomerInput = {
  city?: Maybe<Scalars["String"]>
  country?: Maybe<Scalars["String"]>
  email: Scalars["String"]
  name: Scalars["String"]
  number?: Maybe<Scalars["String"]>
  phone?: Maybe<Scalars["String"]>
  street?: Maybe<Scalars["String"]>
  vat?: Maybe<Scalars["String"]>
  zip?: Maybe<Scalars["String"]>
}

export type Estimate = {
  __typename?: "Estimate"
  createdAt: Scalars["String"]
  customer: Customer
  description: Scalars["String"]
  estimates: Array<Maybe<EstimateItem>>
  id: Scalars["ID"]
  priceWithVat: Scalars["Float"]
  priceWithoutVat: Scalars["Float"]
  updatedAt?: Maybe<Scalars["String"]>
}

export type EstimateItem = {
  __typename?: "EstimateItem"
  createdAt: Scalars["String"]
  description: Scalars["String"]
  id: Scalars["ID"]
  priceWithVat: Scalars["Float"]
  priceWithoutVat: Scalars["Float"]
  quantity: Scalars["Int"]
  unitPrice: Scalars["Float"]
  updatedAt: Scalars["String"]
  vat: Scalars["Float"]
}

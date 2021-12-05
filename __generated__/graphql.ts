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
  creationDate: Scalars["String"]
  customer?: Maybe<Customer>
  description?: Maybe<Scalars["String"]>
  expirationDate: Scalars["String"]
  priceWithVat: Scalars["Float"]
  priceWithoutVat: Scalars["Float"]
  services: Array<Service>
}

export type Query = {
  __typename?: "Query"
  customers: Array<Maybe<Customer>>
  estimates: Array<Maybe<Estimate>>
  findSessionByHandle?: Maybe<Session>
  findUserByEmail?: Maybe<User>
  users?: Maybe<Array<User>>
}

export type QueryFindSessionByHandleArgs = {
  handle: Scalars["String"]
}

export type QueryFindUserByEmailArgs = {
  email: Scalars["String"]
}

export type Service = {
  __typename?: "Service"
  description: Scalars["String"]
  priceWithVat: Scalars["Float"]
  priceWithoutVat: Scalars["Float"]
  quantity: Scalars["Int"]
  unitPrice: Scalars["Float"]
  vat: Scalars["Float"]
}

export type Session = {
  __typename?: "Session"
  antiCSRFToken?: Maybe<Scalars["String"]>
  expiresAt?: Maybe<Scalars["String"]>
  handle: Scalars["String"]
  hashedSessionToken?: Maybe<Scalars["String"]>
  privateData?: Maybe<Scalars["String"]>
  publicData?: Maybe<Scalars["String"]>
  user: User
}

export type User = {
  __typename?: "User"
  email: Scalars["String"]
  hashedPassword?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  role: Scalars["String"]
  sessions?: Maybe<Array<Session>>
}

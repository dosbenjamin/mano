import db from "db"
import { gql } from "graphql-request"
import { Customer } from "__generated__/graphql"

const getCustomer = async (id: string) => {
  const {
    findCustomerByID,
  }: {
    findCustomerByID: Customer
  } = await db.request(
    gql`
      query GetCustomer($id: ID!) {
        findCustomerByID(id: $id) {
          id: _id
          name
          phone
          email
        }
      }
    `,
    { id }
  )

  return findCustomerByID
}

export default getCustomer

import { AuthenticationError, SecurePassword } from "blitz"
import db from "db"
import { gql } from "graphql-request"
import { UserData } from "../types"

export const authenticateUser = async (email: string, password: string) => {
  const { user } = await db.request<{ user: UserData }>(
    gql`
      query getUser($email: String!) {
        user: findUserByEmail(email: $email) {
          id: _id
          email
          name
          role
          hashedPassword
        }
      }
    `,
    { email: email.toLowerCase() }
  )

  if (!user) throw new AuthenticationError("Cet utilisateur n'existe pas")

  const result = await SecurePassword.verify(user.hashedPassword, password)
  console.log(result)

  const { hashedPassword, ...rest } = user
  return rest
}

import { Session, User } from "__generated__/graphql"

export type LoginInput = {
  email: string
  password: string
}

export type UserData = User & { id: string }

export type SessionData = Session & {
  id: string
  user: UserData
}

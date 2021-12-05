import { Ctx } from "blitz"
import { authenticateUser } from "../queries/authenticateUser"
import { LoginInput } from "../types"

const login = async ({ email, password }: LoginInput, { session }: Ctx) => {
  const user = await authenticateUser(email, password)
  await session.$create({ userId: user.id })
  return user
}

export default login

import { Ctx } from "blitz"

const logout = (_: any, { session }: Ctx) => session.$revoke()
export default logout

import { Heading, Stack } from "@chakra-ui/react"
import login from "app/authentication/mutations/login"
import { LoginInput } from "app/authentication/types"
import GrayButton from "app/components/GrayButton"
import Input from "app/components/Input"
import { BlitzPage, useMutation, useRouter } from "blitz"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Container from "../components/Container"
import Layout from "../components/Layout"

const Login: BlitzPage = () => {
  const router = useRouter()
  const [loginMutation] = useMutation(login)
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const onSubmit = (data: LoginInput) => loginMutation(data)

  return (
    <Layout>
      <Container w="400px" h="480px" alignItems="center" justifyContent="center" spacing="12">
        <Heading as="h1" size="xl">
          Connexion
        </Heading>
        <Stack
          w="100%"
          as="form"
          onSubmit={async (values) => {
            try {
              await handleSubmit(onSubmit)(values)
              router.push("/")
            } catch (error) {
              setError("Email ou mot de passe incorrect")
              setTimeout(() => setError(""), 3000)
            }
          }}
        >
          <Input
            label="Email"
            placeholder="john@doe.com"
            type="text"
            borderColor="gray.200"
            _placeholder={{ color: "gray.400" }}
            {...register("email")}
          />
          <Input
            label="Mot de passe"
            placeholder="**********"
            type="password"
            borderColor="gray.200"
            _placeholder={{ color: "gray.400" }}
            {...register("password")}
          />
          <GrayButton w="100%" type="submit">
            Se connecter
          </GrayButton>
          {error && <p>{error}</p>}
        </Stack>
      </Container>
    </Layout>
  )
}

export default Login

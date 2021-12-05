import { Button, Center, CenterProps } from "@chakra-ui/react"
import logout from "app/authentication/mutations/logout"
import { useMutation, useRouter } from "blitz"

type Props = CenterProps & {
  rest?: CenterProps
}

const Layout = ({ children, rest }: Props) => {
  const [logoutMutation] = useMutation(logout)
  const { pathname, push } = useRouter()

  return (
    <>
      {pathname !== "/login" && (
        <Button
          position="absolute"
          top="8px"
          right="8px"
          colorScheme="blackAlpha"
          onClick={async () => {
            await logoutMutation()
            push("/")
          }}
        >
          Se déconnecter
        </Button>
      )}
      <Center h="100vh" w="100vw" bg="red.100" {...rest}>
        {children}
      </Center>
    </>
  )
}

export default Layout

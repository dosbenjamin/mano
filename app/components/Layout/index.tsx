import { Center, CenterProps } from "@chakra-ui/react"

type Props = CenterProps & {
  rest?: CenterProps
}

const Layout = ({ children, rest }: Props) => {
  return (
    <Center h="100vh" w="100vw" bg="red.100" {...rest}>
      {children}
    </Center>
  )
}

export default Layout

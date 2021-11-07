import { Center, CenterProps } from "@chakra-ui/react"

type Props = CenterProps & {
  rest?: any
}

const Layout = ({ children, rest }: Props) => {
  return (
    <Center h="100vh" w="100vw" bg="black" {...rest}>
      {children}
    </Center>
  )
}

export default Layout

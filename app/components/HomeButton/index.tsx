import { StackProps, VStack } from "@chakra-ui/react"

type Props = StackProps & {
  rest?: StackProps
}

const HomeButton = ({ children, rest }: Props) => {
  return (
    <VStack
      h="100%"
      w="100%"
      bg="gray.100"
      cursor="pointer"
      justifyContent="center"
      borderRadius="md"
      _hover={{ bg: "gray.200" }}
      transition="background-color 0.2s"
      {...rest}
    >
      {children}
    </VStack>
  )
}

export default HomeButton

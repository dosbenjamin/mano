import { HStack, List as ChakraList, StackProps, VStack } from "@chakra-ui/react"

type Props = {
  header?: React.ReactNode
  children: React.ReactNode
  rest?: StackProps
}

const List = ({ header, children, rest }: Props) => {
  return (
    <VStack width="100%">
      <HStack display="flex" w="100%" padding="4" spacing="4">
        {header}
      </HStack>
      <ChakraList as="ul" spacing="2" w="100%">
        {children}
      </ChakraList>
    </VStack>
  )
}

export default List

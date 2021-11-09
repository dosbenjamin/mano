import { HStack, List as ChakraList, VStack } from "@chakra-ui/react"

type Props = {
  children: React.ReactNode
  header: React.ReactNode
}

const List = ({ header, children }: Props) => {
  return (
    <VStack>
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

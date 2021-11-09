import { HStack, ListItem as ChakraListItem, ListItemProps } from "@chakra-ui/react"

type Props = ListItemProps & {
  children: React.ReactNode
}

const ListItem = ({ children, ...rest }: Props) => {
  return (
    <ChakraListItem w="100%" borderRadius="lg" overflow="hidden" {...rest}>
      <HStack display="flex" w="100%" spacing="4" padding="4" bg="gray.50">
        {children}
      </HStack>
    </ChakraListItem>
  )
}

export default ListItem

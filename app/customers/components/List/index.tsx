import { Box, HStack } from "@chakra-ui/react"
import EditButton from "app/components/EditButton"
import List from "app/components/List"
import ListItem from "app/components/ListItem"
import RemoveButton from "app/components/RemoveButton"
import removeCustomer from "app/customers/mutations/deleteCustomer"
import getCustomers from "app/customers/queries/getCustomers"
import { useMutation, useQuery, useRouter } from "blitz"

const CustomersList = () => {
  const [customers, { refetch }] = useQuery(getCustomers, undefined)
  const [remove] = useMutation(removeCustomer)
  const router = useRouter()

  return (
    <List
      header={
        <>
          <Box w="240px" textAlign="left">
            Client
          </Box>
          <Box w="240px" textAlign="left">
            E-mail
          </Box>
        </>
      }
    >
      {customers.map(({ id, name, email }) => (
        <ListItem key={id}>
          <Box w="240px" textAlign="left">
            {name}
          </Box>
          <Box w="240px" textAlign="left">
            {email}
          </Box>
          <HStack spacing="2" marginLeft="auto !important">
            <EditButton
              aria-label="Modifier le client"
              onClick={() => router.push(`/customers/${id}`)}
            />
            <RemoveButton
              aria-label="Supprimer le client"
              onClick={() => remove(id).then(() => refetch())}
            />
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

export default CustomersList

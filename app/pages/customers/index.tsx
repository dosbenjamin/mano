import { Box, Heading, HStack } from "@chakra-ui/react"
import EditButton from "app/components/EditButton"
import List from "app/components/List"
import ListItem from "app/components/ListItem"
import RemoveButton from "app/components/RemoveButton"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import getCustomers from "app/customers/queries/getCustomers"
import { BlitzPage, useMutation, useQuery, useRouter } from "blitz"
import { Suspense } from "react"
import Container from "../../components/Container"
import GrayButton from "../../components/GrayButton"
import Layout from "../../components/Layout"

const CustomersList = () => {
  const [customers, { refetch }] = useQuery(getCustomers, undefined)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
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
              onClick={async () => {
                await deleteCustomerMutation(id)
                refetch()
              }}
            />
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

const Customers: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <Container spacing="16">
        <HStack justifyContent="space-between">
          <Heading as="h1" fontSize="4xl">
            Tous les clients
          </Heading>
          <GrayButton onClick={() => router.push("/customers/new")}>Ajouter un client</GrayButton>
        </HStack>
        <Suspense fallback="Loading...">
          <CustomersList />
        </Suspense>
      </Container>
    </Layout>
  )
}

export default Customers

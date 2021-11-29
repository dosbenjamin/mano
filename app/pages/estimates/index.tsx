import { Box, HStack } from "@chakra-ui/react"
import Container from "app/components/Container"
import EditButton from "app/components/EditButton"
import GrayButton from "app/components/GrayButton"
import Header from "app/components/Header"
import Layout from "app/components/Layout"
import List from "app/components/List"
import ListItem from "app/components/ListItem"
import RemoveButton from "app/components/RemoveButton"
import getEstimates from "app/estimates/queries/getEstimates"
import { BlitzPage, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

const EstimatesList = () => {
  const [estimates, { refetch }] = useQuery(getEstimates, undefined, {
    refetchOnWindowFocus: false,
  })
  // const [deleteCustomerMutation] = useMutation(deleteCustomer)
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
      {estimates.map(({ id, customer }) => (
        <ListItem key={id}>
          <Box w="240px" textAlign="left">
            {customer.name}
          </Box>
          <Box w="240px" textAlign="left">
            {/* {email} */}
          </Box>
          <HStack spacing="2" marginLeft="auto !important">
            <EditButton
              aria-label="Modifier le client"
              onClick={() => router.push(`/estimates/${id}`)}
            />
            <RemoveButton
              aria-label="Supprimer le client"
              onClick={async () => {
                // await deleteCustomerMutation(id)
                refetch()
              }}
            />
          </HStack>
        </ListItem>
      ))}
    </List>
  )
}

const Estimates: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <Container>
        <Header title="Tous les devis">
          <GrayButton onClick={() => router.push("/estimates/new")}>Créer un devis</GrayButton>
        </Header>
        <Suspense fallback="Loading...">
          <EstimatesList />
        </Suspense>
      </Container>
    </Layout>
  )
}

export default Estimates

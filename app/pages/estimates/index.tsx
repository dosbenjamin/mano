import { Box, HStack } from "@chakra-ui/react"
import Container from "app/components/Container"
import EditButton from "app/components/EditButton"
import GrayButton from "app/components/GrayButton"
import Header from "app/components/Header"
import Layout from "app/components/Layout"
import List from "app/components/List"
import ListItem from "app/components/ListItem"
import RemoveButton from "app/components/RemoveButton"
import deleteEstimate from "app/estimates/mutations/deleteEstimate"
import getEstimates from "app/estimates/queries/getEstimates"
import { BlitzPage, Link, useMutation, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

const EstimatesList = () => {
  const [estimates, { refetch }] = useQuery(getEstimates, undefined, {
    refetchOnWindowFocus: false,
  })
  const [deleteEstimateMutation] = useMutation(deleteEstimate)
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
            {customer?.name}
          </Box>
          <Box w="240px" textAlign="left">
            {customer?.email || "/"}
          </Box>
          <HStack spacing="2" marginLeft="auto !important">
            <EditButton
              aria-label="Modifier le client"
              onClick={() => router.push(`/estimates/${id}`)}
            />
            <RemoveButton
              aria-label="Supprimer le client"
              onClick={async () => {
                await deleteEstimateMutation(id)
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
  return (
    <Layout>
      <Container>
        <Header title="Tous les devis">
          <Link href="/estimates/create" passHref>
            <a>
              <GrayButton as="span">Créer un devis</GrayButton>
            </a>
          </Link>
        </Header>
        <Suspense fallback="Loading...">
          <EstimatesList />
        </Suspense>
      </Container>
    </Layout>
  )
}

Estimates.authenticate = { redirectTo: "/login" }

export default Estimates

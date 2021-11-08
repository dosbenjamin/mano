import { Heading } from "@chakra-ui/react"
import List from "app/customers/components/List"
import { BlitzPage } from "blitz"
import { Suspense } from "react"
import Container from "../../components/Container"
import Layout from "../../components/Layout"

const Customers: BlitzPage = () => {
  return (
    <Layout>
      <Container spacing="16">
        <Heading as="h1" fontSize="4xl">
          Tous les clients
        </Heading>
        <Suspense fallback="Loading...">
          <List />
        </Suspense>
      </Container>
    </Layout>
  )
}

export default Customers

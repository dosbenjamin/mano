import { VStack } from "@chakra-ui/react"
import HomeButton from "app/components/HomeButton"
import { BlitzPage, Link } from "blitz"
import { FaUserFriends, FaUserPlus } from "react-icons/fa"
import { HiDocument, HiDocumentAdd } from "react-icons/hi"
import Container from "../components/Container"
import Layout from "../components/Layout"

const Home: BlitzPage = () => {
  return (
    <Layout>
      <Container
        direction="row"
        padding="4"
        spacing="4"
        color="gray.800"
        fontSize="3xl"
        fontWeight="bold"
      >
        <VStack w="50%" h="100%" spacing="4">
          <Link href="/customers">
            <a style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              <HomeButton as="div" borderTopLeftRadius="sm">
                <FaUserFriends style={{ width: "64px", height: "64px" }} />
                <div>Clients</div>
              </HomeButton>
            </a>
          </Link>
          <Link href="/customers/add">
            <a style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              <HomeButton borderTopLeftRadius="sm">
                <FaUserPlus style={{ width: "64px", height: "64px" }} />
                <div>Ajouter un client</div>
              </HomeButton>
            </a>
          </Link>
        </VStack>
        <VStack w="50%" h="100%" spacing="4">
          <Link href="/estimates">
            <a style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              <HomeButton as="div" borderTopLeftRadius="sm">
                <HiDocument style={{ width: "64px", height: "64px" }} />
                <div>Devis</div>
              </HomeButton>
            </a>
          </Link>
          <Link href="/estimates/create">
            <a style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              <HomeButton as="div" borderTopLeftRadius="sm">
                <HiDocumentAdd style={{ width: "64px", height: "64px" }} />
                <div>Créer un devis</div>
              </HomeButton>
            </a>
          </Link>
        </VStack>
      </Container>
    </Layout>
  )
}

Home.suppressFirstRenderFlicker = true
Home.authenticate = { redirectTo: "/login" }

export default Home

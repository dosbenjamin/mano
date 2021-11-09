import { Heading } from "@chakra-ui/react"
import GrayButton from "app/components/GrayButton"
import Layout from "app/components/Layout"
import CustomerForm from "app/customers/components/Form"
import createCustomer from "app/customers/mutations/createCustomer"
import { BlitzPage, useMutation } from "blitz"

const NewCustomer: BlitzPage = () => {
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <Layout>
      <CustomerForm onSubmit={(data) => createCustomerMutation(data)}>
        <Heading as="h1" fontSize="4xl">
          Ajouter un client
        </Heading>
        <GrayButton type="submit">Sauvegarder</GrayButton>
      </CustomerForm>
    </Layout>
  )
}

export default NewCustomer

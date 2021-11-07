import { Heading } from "@chakra-ui/react"
import Button from "app/components/Button"
import Layout from "app/components/Layout"
import CustomerForm from "app/customers/components/Form"
import createCustomer from "app/customers/mutations/createCustomer"
import { BlitzPage, useMutation } from "blitz"

const NewCustomer: BlitzPage = () => {
  const [newCustomer] = useMutation(createCustomer)

  return (
    <Layout>
      <CustomerForm onSubmit={(data) => newCustomer(data)}>
        <Heading as="h1" fontSize="4xl" width="40%">
          Nouveau client
        </Heading>
        <Button type="submit">Ajouter le client</Button>
      </CustomerForm>
    </Layout>
  )
}

export default NewCustomer

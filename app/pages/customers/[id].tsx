import { HStack } from "@chakra-ui/react"
import GrayButton from "app/components/GrayButton"
import Header from "app/components/Header"
import Layout from "app/components/Layout"
import RedButton from "app/components/RedButton"
import CustomerForm from "app/customers/components/Form"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import { BlitzPage, useMutation, useParam, useQuery, useRouter } from "blitz"
import { Suspense } from "react"

const CustomerItem = () => {
  const id = useParam("id") as string
  const [customer] = useQuery(getCustomer, id, { refetchOnWindowFocus: false })
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const router = useRouter()

  return (
    <CustomerForm
      onSubmit={(data) => updateCustomerMutation({ id, data })}
      initialValues={customer}
    >
      <Header title="Modifier un client">
        <HStack>
          <GrayButton type="submit">Sauvegarder</GrayButton>
          <RedButton
            onClick={async () => {
              await deleteCustomerMutation(id)
              router.push("/customers")
            }}
          >
            Supprimer
          </RedButton>
        </HStack>
      </Header>
    </CustomerForm>
  )
}

const Customer: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback="Loading...">
        <CustomerItem />
      </Suspense>
    </Layout>
  )
}

export default Customer

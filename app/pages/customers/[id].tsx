import { HStack } from "@chakra-ui/react"
import GrayButton from "app/components/GrayButton"
import Layout from "app/components/Layout"
import RedButton from "app/components/RedButton"
import CustomerForm from "app/customers/components/Form"
import deleteCustomer from "app/customers/mutations/deleteCustomer"
import updateCustomer from "app/customers/mutations/updateCustomer"
import getCustomer from "app/customers/queries/getCustomer"
import { CustomerData } from "app/customers/types"
import { BlitzPage, GetServerSideProps, useMutation, useRouter } from "blitz"

type Props = { customer: CustomerData }
type Params = { id: string }

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const { id } = params!
  const customer = await getCustomer(id)
  return { props: { customer } }
}

const Customer: BlitzPage<Props> = ({ customer }) => {
  const [updateCustomerMutation] = useMutation(updateCustomer)
  const [deleteCustomerMutation] = useMutation(deleteCustomer)
  const router = useRouter()

  return (
    <Layout>
      <CustomerForm
        title="Modifier un client"
        onSubmit={(data) => updateCustomerMutation({ id: customer.id, data })}
        initialValues={customer}
      >
        <HStack>
          <RedButton
            onClick={async () => {
              await deleteCustomerMutation(customer.id)
              router.push("/customers")
            }}
          >
            Supprimer
          </RedButton>
          <GrayButton type="submit">Sauvegarder</GrayButton>
        </HStack>
      </CustomerForm>
    </Layout>
  )
}

export default Customer

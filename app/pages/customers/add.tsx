import GrayButton from "app/components/GrayButton"
import Layout from "app/components/Layout"
import CustomerForm from "app/customers/components/Form"
import createCustomer from "app/customers/mutations/createCustomer"
import { BlitzPage, useMutation } from "blitz"

const AddCustomer: BlitzPage = () => {
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <Layout>
      <CustomerForm title="Ajouter un client" onSubmit={createCustomerMutation}>
        <GrayButton type="submit">Sauvegarder</GrayButton>
      </CustomerForm>
    </Layout>
  )
}

AddCustomer.authenticate = { redirectTo: "/login" }

export default AddCustomer

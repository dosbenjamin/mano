import GrayButton from "app/components/GrayButton"
import Layout from "app/components/Layout"
import CustomerForm from "app/customers/components/Form"
import createCustomer from "app/customers/mutations/createCustomer"
import { BlitzPage, useMutation } from "blitz"

const NewCustomer: BlitzPage = () => {
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <Layout>
      <CustomerForm title="Ajouter un client" onSubmit={(data) => createCustomerMutation(data)}>
        <GrayButton type="submit">Sauvegarder</GrayButton>
      </CustomerForm>
    </Layout>
  )
}

export default NewCustomer

import GrayButton from "app/components/GrayButton"
import Header from "app/components/Header"
import Layout from "app/components/Layout"
import CustomerForm from "app/customers/components/Form"
import createCustomer from "app/customers/mutations/createCustomer"
import { BlitzPage, useMutation } from "blitz"

const NewCustomer: BlitzPage = () => {
  const [createCustomerMutation] = useMutation(createCustomer)

  return (
    <Layout>
      <CustomerForm onSubmit={(data) => createCustomerMutation(data)}>
        <Header title="Ajouter un client">
          <GrayButton type="submit">Sauvegarder</GrayButton>
        </Header>
      </CustomerForm>
    </Layout>
  )
}

export default NewCustomer

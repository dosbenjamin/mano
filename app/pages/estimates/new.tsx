import GrayButton from "app/components/GrayButton"
import Layout from "app/components/Layout"
import getCustomers from "app/customers/queries/getCustomers"
import EstimateForm from "app/estimates/components/Form"
import { BlitzPage } from "blitz"
import { Customer } from "__generated__/graphql"

type Props = { data: Customer[] }

export const getServerSideProps = async () => {
  const data = await getCustomers()
  return { props: { data } }
}

const NewEstimate: BlitzPage<Props> = ({ data }) => {
  return (
    <Layout>
      <EstimateForm title="Créer un devis" onSubmit={(data) => console.log(data)} customers={data}>
        <GrayButton type="submit">Sauvegarder</GrayButton>
      </EstimateForm>
    </Layout>
  )
}

export default NewEstimate

import GrayButton from "app/components/GrayButton"
import Layout from "app/components/Layout"
import getCustomers from "app/customers/queries/getCustomers"
import type { CustomerData } from "app/customers/types"
import EstimateForm from "app/estimates/components/Form"
import createEstimate from "app/estimates/mutations/createEstimate"
import { BlitzPage, GetServerSideProps, useMutation } from "blitz"

type Props = { customers: CustomerData[] }

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const customers = await getCustomers()
  return { props: { customers } }
}

const CreateEstimate: BlitzPage<Props> = (props) => {
  const [createEstimateMutation] = useMutation(createEstimate)

  return (
    <Layout>
      <EstimateForm title="Créer un devis" onSubmit={createEstimateMutation} {...props}>
        <GrayButton type="submit">Sauvegarder</GrayButton>
      </EstimateForm>
    </Layout>
  )
}

export default CreateEstimate

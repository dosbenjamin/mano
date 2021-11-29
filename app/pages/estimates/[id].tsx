import { HStack } from "@chakra-ui/react"
import { Document, Page, Text, usePDF } from "@react-pdf/renderer"
import GrayButton from "app/components/GrayButton"
import RedButton from "app/components/RedButton"
import getCustomers from "app/customers/queries/getCustomers"
import type { CustomerData } from "app/customers/types"
import getEstimate from "app/estimates/queries/getEstimate"
import type { EstimateData, EstimateInput } from "app/estimates/types"
import { BlitzPage, GetServerSideProps } from "blitz"
import { Suspense, useEffect, useState } from "react"
import Layout from "../../components/Layout"
import EstimateForm from "../../estimates/components/Form"

type Props = {
  estimate: EstimateData
  customers: CustomerData[]
}

type Params = { id: string }

type PDFProps = { estimate?: EstimateInput }

const DownloadLink = ({ estimate }: PDFProps) => {
  const [instance, updateInstance] = usePDF({ document: <PDF estimate={estimate} /> })
  useEffect(() => updateInstance(), [estimate])

  return (
    <GrayButton as="a" href={instance.url || ""} download="estimate.pdf">
      Télécharger
    </GrayButton>
  )
}

const PDF = ({ estimate }: PDFProps) => {
  return (
    <Document>
      <Page size="A4">
        <Text>
          {JSON.stringify(estimate)}
          Hello
        </Text>
      </Page>
    </Document>
  )
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({ params }) => {
  const { id } = params!
  const estimate = await getEstimate(id)
  const customers = await getCustomers()
  return { props: { estimate, customers } }
}

const Estimate: BlitzPage<Props> = (props) => {
  const [estimate, setEstimate] = useState<EstimateInput>()

  return (
    <Layout>
      <EstimateForm
        title="Modifier le devis"
        onSubmit={(data) => {
          setEstimate(data)
        }}
        setPDF={setEstimate}
        {...props}
      >
        <HStack>
          <RedButton>Supprimer</RedButton>
          <Suspense fallback="loading...">
            <DownloadLink estimate={estimate} />
          </Suspense>
          <GrayButton>Sauvegarder</GrayButton>
        </HStack>
      </EstimateForm>
    </Layout>
  )
}

export default Estimate

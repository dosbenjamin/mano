import { HStack } from "@chakra-ui/react"
import { Document, Font, Link, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer"
import GrayButton from "app/components/GrayButton"
import RedButton from "app/components/RedButton"
import getCustomers from "app/customers/queries/getCustomers"
import type { CustomerData } from "app/customers/types"
import getEstimate from "app/estimates/queries/getEstimate"
import type { EstimateData, EstimateInput } from "app/estimates/types"
import { BlitzPage, GetServerSideProps } from "blitz"
// @ts-ignore
import SpaceGrotesk from "public/fonts/SpaceGrotesk-Regular.woff"
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

Font.register({ family: "Space Grotesk", src: SpaceGrotesk })

const styles = StyleSheet.create({
  page: {
    padding: "24px",
    fontSize: "12px",
    textTransform: "uppercase",
    fontFamily: "Space Grotesk",
    lineHeight: 1,
  },
})

const PDF = ({ estimate }: PDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <View
            style={{
              fontSize: "16px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text>Benjamin</Text>
              <Text>Dos Santos</Text>
            </View>
            <Text>Devis</Text>
          </View>
          <Text style={{ marginTop: "8px" }}>Avenue Albert 1er 299</Text>
          <Text>1332 Genval</Text>
          <Text>Belgique</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "32px",
          }}
        >
          <View>
            <Text>Envoyé à</Text>
            <Text style={{ marginTop: "8px" }}>Benjamin Dos Santos</Text>
            <Text>Avenue Albert 1er 299</Text>
            <Text>1332 Genval</Text>
            <Text>Belgique</Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Text>Date du devis</Text>
            <Text style={{ marginTop: "8px" }}>09 août 2021</Text>
          </View>
          <View style={{ marginLeft: "48px" }}>
            <Text>Expiration du devis</Text>
            <Text style={{ marginTop: "8px" }}>30 septembre 2021</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#2C2C2C",
            padding: "8px",
            marginTop: "32px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#FFF",
          }}
        >
          <Text style={{ flexGrow: 1 }}>Description</Text>
          <Text style={{ width: "80px" }}>Quantité</Text>
          <Text style={{ width: "40px" }}>TVA</Text>
          <Text style={{ width: "80px" }}>Prix HTVA</Text>
          <Text style={{ width: "80px" }}>Prix TVA</Text>
        </View>
        {estimate?.services.map(({ description, quantity, priceWithVat, priceWithoutVat, vat }) => (
          <View
            key={description}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "8px",
              padding: "0 8px 0 8px",
            }}
          >
            <Text style={{ flexGrow: 1 }}>{description}</Text>
            <Text style={{ width: "80px" }}>{quantity}x</Text>
            <Text style={{ width: "40px" }}>{vat}</Text>
            <Text style={{ width: "80px" }}>{priceWithoutVat}€</Text>
            <Text style={{ width: "80px" }}>{priceWithVat}€</Text>
          </View>
        ))}
        <View
          style={{
            padding: "8px 8px 0 8px",
            marginTop: "8px",
            display: "flex",
            borderTop: "1px solid #2C2C2C",
            flexDirection: "row",
          }}
        >
          <Text>Total</Text>
          <Text style={{ marginLeft: "auto", width: "80px" }}>{estimate?.priceWithVat}€</Text>
          <Text style={{ width: "80px" }}>{estimate?.priceWithoutVat}€</Text>
        </View>
        <View
          style={{
            padding: "8px 8px 0 8px",
            marginTop: "8px",
            borderTop: "1px solid #2C2C2C",
          }}
        >
          <Text>Information complémentaires</Text>
          <Text style={{ marginTop: "8px", width: "380px" }}>{estimate?.description}</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
        >
          <Text>BE0775493620</Text>
          <Link
            src="mailto:hello@benjamindossantos.be"
            style={{
              textAlign: "right",
              color: "#2C2C2C",
              textDecoration: "none",
            }}
          >
            hello@benjamindossantos.be
          </Link>
        </View>
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

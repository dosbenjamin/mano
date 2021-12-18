import { HStack } from "@chakra-ui/react"
import { Document, Font, Link, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer"
import GrayButton from "app/components/GrayButton"
import RedButton from "app/components/RedButton"
import getCustomer from "app/customers/queries/getCustomer"
import type { CustomerData } from "app/customers/types"
import deleteEstimate from "app/estimates/mutations/deleteEstimate"
import updateEstimate from "app/estimates/mutations/updateEstimate"
import getEstimateCustomers from "app/estimates/queries/getEstimateCustomer"
import type { EstimateData, EstimateInput } from "app/estimates/types"
import { BlitzPage, GetServerSideProps, useQuery } from "blitz"
import dayjs from "dayjs"
import "dayjs/locale/fr"
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

type DownloadLinkProps = { estimate?: EstimateInput }
type PDFProps = { estimate?: EstimateInput; customer?: CustomerData }

const DownloadLink = ({ estimate }: DownloadLinkProps) => {
  const [customer] = useQuery(getCustomer, estimate?.customer!)
  const [instance, updateInstance] = usePDF({
    document: <PDF estimate={estimate} customer={customer} />,
  })
  useEffect(() => updateInstance(), [customer])

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

const PDF = ({ estimate, customer }: PDFProps) => {
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
            <Text style={{ marginTop: "8px" }}>{customer?.name}</Text>
            <Text>
              {customer?.street} {customer?.number}
            </Text>
            <Text>
              {customer?.zip} {customer?.city}
            </Text>
            <Text>{customer?.country}</Text>
          </View>
          <View style={{ marginLeft: "auto" }}>
            <Text>Date du devis</Text>
            <Text style={{ marginTop: "8px" }}>
              {dayjs(estimate?.creationDate).locale("fr").format("DD MMMM YYYY")}
            </Text>
          </View>
          <View style={{ marginLeft: "48px" }}>
            <Text>Expiration du devis</Text>
            <Text style={{ marginTop: "8px" }}>
              {dayjs(estimate?.expirationDate).locale("fr").format("DD MMMM YYYY")}
            </Text>
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
  const { estimate, customers } = await getEstimateCustomers(id)
  return { props: { estimate, customers } }
}

const Estimate: BlitzPage<Props> = ({ estimate, ...rest }) => {
  const [pdf, setPdf] = useState<EstimateInput>()

  return (
    <Layout>
      <EstimateForm
        title="Modifier le devis"
        onSubmit={async (data) => {
          await updateEstimate({ id: estimate.id, data })
          setPdf(data)
        }}
        setPDF={setPdf}
        estimate={estimate}
        {...rest}
      >
        <HStack>
          <RedButton onClick={() => deleteEstimate(estimate.id)}>Supprimer</RedButton>
          <Suspense fallback="loading...">
            <DownloadLink estimate={pdf} />
          </Suspense>
          <GrayButton type="submit">Sauvegarder</GrayButton>
        </HStack>
      </EstimateForm>
    </Layout>
  )
}

Estimate.authenticate = { redirectTo: "/login" }

export default Estimate

import { Accordion, Box, FormLabel, HStack, Select, Textarea, VStack } from "@chakra-ui/react"
import Container from "app/components/Container"
import GrayButton from "app/components/GrayButton"
import Header from "app/components/Header"
import Input from "app/components/Input"
import type { CustomerData } from "app/customers/types"
import type { EstimateData, EstimateInput } from "app/estimates/types"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import type { Service } from "__generated__/graphql"
import ServiceLine from "../ServiceLine"

type Props = {
  children?: React.ReactNode
  customers: CustomerData[]
  estimate?: EstimateData
  title: string
  onSubmit: (data: EstimateInput) => void
}

const EstimateForm = ({ children, customers = [], estimate, title, onSubmit }: Props) => {
  const [priceWithoutVat, setPriceWithoutVat] = useState(estimate?.priceWithoutVat || 0)
  const [priceWithVat, setPriceWithVat] = useState(estimate?.priceWithVat || 0)

  const { control, getValues, handleSubmit, register, setValue } = useForm<EstimateInput>({
    defaultValues: {
      customer: estimate?.customer.id,
      description: estimate?.description || "",
      priceWithoutVat,
      priceWithVat,
      services: estimate?.services.data || [],
    },
  })

  const {
    fields: services,
    prepend,
    remove,
  } = useFieldArray({
    control,
    name: "services",
  } as never)

  const updateTotalPrices = () => {
    // @ts-ignore
    const services = getValues("services")

    const { priceWithoutVat, priceWithVat } = services.reduce(
      (total, { priceWithoutVat, priceWithVat }) => ({
        priceWithoutVat: total.priceWithoutVat + priceWithoutVat,
        priceWithVat: total.priceWithVat + priceWithVat,
      }),
      {
        priceWithoutVat: 0,
        priceWithVat: 0,
      }
    )

    setPriceWithoutVat(priceWithoutVat)
    setValue("priceWithoutVat", priceWithVat)

    setPriceWithVat(priceWithVat)
    setValue("priceWithVat", priceWithoutVat)
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Header title={title}>{children}</Header>
      <HStack spacing="8" h="100%" alignItems="flex-start">
        <VStack w="50%" h="100%" alignItems="flex-start" spacing="4">
          <Box w="100%">
            <FormLabel>Client :</FormLabel>
            <Select
              size="lg"
              borderColor="gray.200"
              _placeholder={{ color: "gray.400" }}
              _hover={{ borderColor: "gray.400" }}
              focusBorderColor="gray.400"
              placeholder="Sélectionner un client"
              {...register("customer")}
            >
              {customers.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>
          <VStack h="100%" w="100%" alignItems="flex-start" spacing="0">
            <FormLabel>Informations complémentaire</FormLabel>
            <Textarea
              placeholder="Un accompte de 30% sera demandé à la validation du devis."
              borderColor="gray.200"
              _placeholder={{ color: "gray.400" }}
              _hover={{ borderColor: "gray.400" }}
              focusBorderColor="gray.400"
              fontSize="lg"
              paddingY="3"
              paddingX="4"
              height="100%"
              resize="none"
              {...register("description")}
            />
          </VStack>
          <HStack w="100%" spacing="4">
            <Input label="Création" type="date" />
            <Input label="Expiration" type="date" />
          </HStack>
          <HStack spacing="8" w="100%">
            <Box w="50%">
              Total HTVA&nbsp;: {priceWithoutVat || 0}€
              <input type="hidden" {...register("priceWithoutVat")} />
            </Box>
            <Box w="50%">
              Total TVAC&nbsp;: {priceWithVat || 0}€
              <input type="hidden" {...register("priceWithVat")} />
            </Box>
          </HStack>
        </VStack>
        <VStack w="50%">
          <GrayButton
            w="100%"
            onClick={() => {
              prepend({
                description: "",
                vat: 21,
                quantity: 1,
                unitPrice: 0,
                priceWithVat: 0,
                priceWithoutVat: 0,
              })
            }}
          >
            Ajouter un bien/service
          </GrayButton>
          <Accordion maxHeight="300px" w="100%" overflowY="scroll" listStyleType="none" allowToggle>
            {(services as Array<Service & { id: string }>).map(({ id, ...rest }, index) => (
              <ServiceLine
                key={id}
                index={index}
                control={control}
                service={{ ...rest }}
                setValue={setValue}
                updateTotalPrices={updateTotalPrices}
                register={register}
                remove={remove}
              />
            ))}
          </Accordion>
        </VStack>
      </HStack>
    </Container>
  )
}

export default EstimateForm

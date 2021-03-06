import { Accordion, Box, FormLabel, HStack, Select, Textarea, VStack } from "@chakra-ui/react"
import Container from "app/components/Container"
import GrayButton from "app/components/GrayButton"
import Header from "app/components/Header"
import Input from "app/components/Input"
import type { CustomerData } from "app/customers/types"
import type { EstimateData, EstimateInput } from "app/estimates/types"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import ServiceLine from "../ServiceLine"

type Props = {
  children?: React.ReactNode
  customers: CustomerData[]
  estimate?: EstimateData
  title: string
  onSubmit: (data: EstimateInput) => void
  setPDF?: (data: EstimateInput) => void
}

const EstimateForm = ({ children, customers = [], estimate, title, onSubmit, setPDF }: Props) => {
  const [priceWithoutVat, setPriceWithoutVat] = useState(estimate?.priceWithoutVat || 0)
  const [priceWithVat, setPriceWithVat] = useState(estimate?.priceWithVat || 0)
  const [customer, setCustomer] = useState(estimate?.customer.id || "")

  const { control, getValues, handleSubmit, register, setValue } = useForm<EstimateInput>({
    defaultValues: {
      customer,
      description: estimate?.description || "",
      priceWithoutVat,
      priceWithVat,
      creationDate: estimate?.creationDate || dayjs().format("YYYY-MM-DD"),
      expirationDate:
        estimate?.expirationDate ||
        dayjs(estimate?.creationDate).add(1, "month").format("YYYY-MM-DD"),
      services: estimate?.services || [],
    },
  })

  const {
    fields: services,
    prepend,
    remove,
  } = useFieldArray({
    control,
    name: "services",
  })

  const updateTotalPrices = () => {
    const services = getValues("services")

    const { priceWithoutVat, priceWithVat } = services.reduce(
      (total, { priceWithoutVat, priceWithVat }) => ({
        priceWithoutVat: total.priceWithoutVat + priceWithoutVat,
        priceWithVat: total.priceWithVat + priceWithVat,
      }),
      { priceWithoutVat: 0, priceWithVat: 0 }
    )

    setPriceWithoutVat(priceWithoutVat)
    setValue("priceWithoutVat", priceWithVat)

    setPriceWithVat(priceWithVat)
    setValue("priceWithVat", priceWithoutVat)
  }

  useEffect(() => setPDF && setPDF(getValues()), [priceWithVat, customer])

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
              placeholder="S??lectionner un client"
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
            <FormLabel>Informations compl??mentaire</FormLabel>
            <Textarea
              placeholder="Un accompte de 30% sera demand?? ?? la validation du devis."
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
            <Input label="Cr??ation" type="date" {...register("creationDate")} />
            <Input label="Expiration" type="date" {...register("expirationDate")} />
          </HStack>
          <HStack spacing="8" w="100%">
            <Box w="50%">
              Total HTVA&nbsp;: {priceWithoutVat || 0}???
              <input type="hidden" {...register("priceWithoutVat")} />
            </Box>
            <Box w="50%">
              Total TVAC&nbsp;: {priceWithVat || 0}???
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
            {services.map(({ id, ...rest }, index) => (
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

import { HStack, VStack } from "@chakra-ui/react"
import Container from "app/components/Container"
import Header from "app/components/Header"
import Input from "app/components/Input"
import type { CustomerData, CustomerInput } from "app/customers/types"
import { useForm } from "react-hook-form"

type Props = {
  title: string
  children?: React.ReactNode
  initialValues?: CustomerInput
  onSubmit: (data: CustomerData) => void
}

const CustomerForm = ({ children, title, initialValues, onSubmit }: Props) => {
  const { register, handleSubmit } = useForm()

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Header title={title}>{children}</Header>
      <HStack spacing="8" alignItems="flex-start">
        <VStack alignItems="flex-start" spacing="4" w="100%">
          <Input
            label="Nom"
            placeholder="Benjamin Dos Santos"
            defaultValue={initialValues?.name || ""}
            {...register("name")}
          />
          <Input
            label="Numéro de T.V.A"
            placeholder="BE0775493620"
            defaultValue={initialValues?.vat || ""}
            {...register("vat")}
          />
          <Input
            label="E-mail"
            placeholder="hello@benjamindossantos.be"
            type="email"
            defaultValue={initialValues?.email || ""}
            {...register("email")}
          />
          <Input
            label="Téléphone"
            placeholder="0478686902"
            type="tel"
            defaultValue={initialValues?.phone || ""}
            {...register("phone")}
          />
        </VStack>
        <VStack w="100%" spacing="4">
          <HStack spacing="4" w="100%">
            <Input
              label="Rue"
              placeholder="Avenue Albert 1er"
              defaultValue={initialValues?.street || ""}
              {...register("street")}
            />
            <Input
              label="Numéro"
              placeholder="299"
              w="144px"
              defaultValue={initialValues?.number || ""}
              {...register("number")}
            />
          </HStack>
          <HStack spacing="4" w="100%">
            <Input
              label="Ville"
              placeholder="Genval"
              defaultValue={initialValues?.city || ""}
              {...register("city")}
            />
            <Input
              label="Code postal"
              placeholder="1332"
              defaultValue={initialValues?.zip || ""}
              {...register("zip")}
            />
          </HStack>
          <Input
            label="Pays"
            placeholder="Belgique"
            defaultValue={initialValues?.country || ""}
            {...register("country")}
          />
        </VStack>
      </HStack>
    </Container>
  )
}

export default CustomerForm

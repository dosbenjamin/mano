import { AccordionButton, AccordionItem, AccordionPanel, Box, HStack } from "@chakra-ui/react"
import Input from "app/components/Input"
import RemoveButton from "app/components/RemoveButton"
import type { EstimateInput } from "app/estimates/types"
import { useEffect, useState } from "react"
import { Control, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import type { Service } from "__generated__/graphql"

type Props = {
  index: number
  control: Control
  service: Service
  setValue: UseFormSetValue<EstimateInput>
  updateTotalPrices: () => void
  register: UseFormRegister<EstimateInput>
  remove: (index: number) => Promise<void> | void
}

const ServiceLine = ({
  index,
  control,
  service,
  setValue,
  updateTotalPrices,
  register,
  remove,
}: Props) => {
  const [priceWithoutVat, setPriceWithoutVat] = useState(service.priceWithoutVat)
  const [priceWithVat, setPriceWithVat] = useState(service.priceWithVat)

  const { description, quantity, unitPrice, vat }: Service = useWatch({
    control,
    name: `services.${index}`,
  })

  const updatePriceWithoutVat = () => {
    const price = quantity * unitPrice
    setPriceWithoutVat(price)

    // @ts-ignore
    setValue(`services.${index}.priceWithoutVat`, price)
  }

  const updatePriceWithVat = () => {
    const price = priceWithoutVat + (priceWithoutVat * vat) / 100
    setPriceWithVat(price)
    setValue(`services.${index}.priceWithVat`, price)
  }

  useEffect(() => {
    updatePriceWithoutVat()
  }, [quantity, unitPrice])

  useEffect(() => {
    updatePriceWithVat()
    updateTotalPrices()
  }, [priceWithoutVat, vat])

  return (
    <AccordionItem>
      <AccordionItem w="100%">
        <AccordionButton as="div" cursor="pointer" borderRadius="lg" justifyContent="space-between">
          {description || `Bien/service ${index + 1}`}
          <RemoveButton
            minH="24px"
            minW="24px"
            h="24px"
            w="24px"
            aria-label="Supprimer le service"
            onClick={() => {
              remove(index)
              updateTotalPrices()
            }}
          />
        </AccordionButton>
        <AccordionPanel>
          <Input
            label="Description"
            placeholder="Développement de la page contact"
            {...register(`services.${index}.description`)}
          />
          <HStack mt="4">
            <Input
              label="Quantité"
              placeholder="1"
              w="80px"
              flexShrink={0}
              {...register(`services.${index}.quantity`, { valueAsNumber: true })}
            />
            <Input
              label="T.V.A"
              placeholder="21"
              w="80px"
              flexShrink={0}
              {...register(`services.${index}.vat`, { valueAsNumber: true })}
            />
            <Input
              label="Prix unitaire"
              placeholder="500"
              w="auto"
              {...register(`services.${index}.unitPrice`, { valueAsNumber: true })}
            />
          </HStack>
          <HStack spacing="8" alignItems="flex-start" mt="4">
            <Box w="50%">
              Total HTVA: {priceWithoutVat || 0}€
              <input
                type="hidden"
                {...register(`services.${index}.priceWithoutVat`, { valueAsNumber: true })}
              />
            </Box>
            <Box w="50%">
              Total TVAC: {priceWithVat || 0}€
              <input
                type="hidden"
                {...register(`services.${index}.priceWithVat`, { valueAsNumber: true })}
              />
            </Box>
          </HStack>
        </AccordionPanel>
      </AccordionItem>
    </AccordionItem>
  )
}

export default ServiceLine

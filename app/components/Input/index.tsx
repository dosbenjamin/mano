import { Box, FormLabel, Input as ChakraInput, InputProps } from "@chakra-ui/react"
import { forwardRef } from "react"

type Props = InputProps & {
  label: string
}

const Input = forwardRef<HTMLInputElement>(({ w = "100%", label, ...rest }: Props, ref) => {
  return (
    <Box w={w}>
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        ref={ref}
        size="lg"
        borderColor="gray.200"
        _placeholder={{ color: "gray.400" }}
        _hover={{ borderColor: "gray.400" }}
        focusBorderColor="gray.400"
        {...rest}
      />
    </Box>
  )
})

export default Input

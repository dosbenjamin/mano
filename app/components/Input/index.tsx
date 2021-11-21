import { Box, FormLabel, Input as ChakraInput, InputProps } from "@chakra-ui/react"
import { ForwardedRef, forwardRef } from "react"

type Props = InputProps & {
  label: string
}

const Input = forwardRef(({ w = "100%", label, flexShrink, ...rest }: Props, ref) => {
  return (
    <Box
      w={w}
      flexShrink={flexShrink}
    >
      <FormLabel>{label}</FormLabel>
      <ChakraInput
        ref={ref as ForwardedRef<HTMLInputElement>}
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

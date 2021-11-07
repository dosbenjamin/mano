import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react"

type Props = ButtonProps & {
  children: React.ReactNode
}

const Button = ({ children, ...rest }: Props) => {
  return (
    <ChakraButton size="lg" colorScheme="blackAlpha" {...rest}>
      {children}
    </ChakraButton>
  )
}

export default Button

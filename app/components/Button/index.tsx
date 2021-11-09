import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react"

export type Props = ButtonProps & {
  children: React.ReactNode
}

const Button = ({ children, ...rest }: Props) => {
  return (
    <ChakraButton size="lg" {...rest}>
      {children}
    </ChakraButton>
  )
}

export default Button

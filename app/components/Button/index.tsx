import { Button as ChakraButton, ButtonProps, LinkProps } from "@chakra-ui/react"

export type Props = ButtonProps &
  LinkProps & {
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

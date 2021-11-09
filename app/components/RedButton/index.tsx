import Button, { Props } from "../Button"

const RedButton = ({ children, ...rest }: Props) => {
  return (
    <Button colorScheme="red" {...rest}>
      {children}
    </Button>
  )
}

export default RedButton

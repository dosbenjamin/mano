import Button, { Props } from "../Button"

const GrayButton = ({ children, ...rest }: Props) => {
  return (
    <Button colorScheme="blackAlpha" {...rest}>
      {children}
    </Button>
  )
}

export default GrayButton

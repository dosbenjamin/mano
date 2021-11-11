import { Heading, HStack } from "@chakra-ui/react"

type Props = {
  title: string
  children?: React.ReactNode
}

const Header = ({ children, title }: Props) => {
  return (
    <HStack justifyContent="space-between">
      <Heading fontSize="4xl" as="h1">
        {title}
      </Heading>
      {children}
    </HStack>
  )
}

export default Header

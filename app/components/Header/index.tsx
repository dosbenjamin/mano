import { ArrowBackIcon } from "@chakra-ui/icons"
import { Heading, HStack } from "@chakra-ui/react"
import { Link } from "blitz"

type Props = {
  title: string
  children?: React.ReactNode
}

const Header = ({ children, title }: Props) => {
  return (
    <HStack justifyContent="space-between">
      <HStack>
        <Link href="/">
          <a>
            <ArrowBackIcon h="16px" w="16px" />
          </a>
        </Link>
        <Heading fontSize="4xl" as="h1">
          {title}
        </Heading>
      </HStack>
      {children}
    </HStack>
  )
}

export default Header

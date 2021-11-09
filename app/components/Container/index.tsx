import { Stack, StackProps } from "@chakra-ui/react"

type Props = StackProps

const Container = ({ h = "600px", w = "1024px", children, ...rest }: Props) => {
  return (
    <Stack
      h={h}
      w={w}
      color="black"
      bg="white"
      borderRadius="lg"
      padding="16"
      boxShadow="xl"
      {...rest}
    >
      {children}
    </Stack>
  )
}

export default Container

import { IconButton as ChakraIconButton, IconButtonProps } from '@chakra-ui/react'

export type Props = IconButtonProps

const IconButton = ({ ...rest }: Props ) => {
  return (
    <ChakraIconButton
      h="12"
      w="12"
      borderRadius="100%"
      {...rest}
    />
  )
}

export default IconButton
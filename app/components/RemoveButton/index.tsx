import { DeleteIcon } from "@chakra-ui/icons"
import IconButton, { Props as IconButtonProps } from "../IconButton"

type Props = IconButtonProps

const EditButton = ({ ...rest }: Props) => {
  return (
    <IconButton
      colorScheme="red"
      icon={<DeleteIcon h="50%" w="50%" maxH="16px" maxW="16px" />}
      {...rest}
    />
  )
}

export default EditButton

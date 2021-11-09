import { DeleteIcon } from "@chakra-ui/icons"
import IconButton, { Props as IconButtonProps } from "../IconButton"

type Props = IconButtonProps

const EditButton = ({ ...rest }: Props) => {
  return <IconButton colorScheme="red" icon={<DeleteIcon />} {...rest} />
}

export default EditButton

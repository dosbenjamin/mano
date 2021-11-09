import { EditIcon } from "@chakra-ui/icons"
import IconButton, { Props as IconButtonProps } from "../IconButton"

type Props = IconButtonProps

const EditButton = ({ ...rest }: Props) => {
  return <IconButton colorScheme="blackAlpha" icon={<EditIcon />} {...rest} />
}

export default EditButton

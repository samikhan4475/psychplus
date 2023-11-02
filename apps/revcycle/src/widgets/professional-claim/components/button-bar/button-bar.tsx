import {
  CaretDownIcon,
  CheckIcon,
  ClipboardIcon,
  Cross1Icon,
  DotsVerticalIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { DropdownMenuButton } from './dropdown-menu-button'

const PRINT_OPTIONS = [
  'Save and Print Claim',
  'Save and Show Preview',
  'Save and Print Copy',
  'Save and Print with Form',
]
const REVIEW_OPTIONS = ['Save and Review Claim']
const MORE_OPTIONS = ['Convert Claim to Institutional']

const ButtonBar = () => {
  const saveClickHandler = () => console.log('saveClickHandler')
  const cancleClickHandler = () => console.log('cancleClickHandler')

  return (
    <>
      <Box mb="2">
        <Flex align="center" gap="1">
          <Button variant="solid" onClick={saveClickHandler}>
            <CheckIcon />
            Save
          </Button>
          <Button variant="soft" onClick={cancleClickHandler}>
            <Cross1Icon />
            Cancel
          </Button>
          <DropdownMenuButton
            leftIcon={<FileTextIcon />}
            rightIcon={<CaretDownIcon />}
            buttonLabel="Print"
            options={PRINT_OPTIONS}
          />
          <DropdownMenuButton
            leftIcon={<ClipboardIcon />}
            rightIcon={<CaretDownIcon />}
            buttonLabel="Review"
            options={REVIEW_OPTIONS}
          />
          <DropdownMenuButton
            leftIcon={<DotsVerticalIcon />}
            rightIcon={<CaretDownIcon />}
            buttonLabel="More"
            options={MORE_OPTIONS}
          />
        </Flex>
      </Box>
    </>
  )
}

export { ButtonBar }

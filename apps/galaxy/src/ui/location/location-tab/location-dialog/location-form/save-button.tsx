import { Button, Flex } from '@radix-ui/themes'

interface SaveButtonProps {
  isEditable?: boolean
}
const SaveButton = ({ isEditable }: SaveButtonProps) => {
  return (
    <Flex justify="end" className="col-span-full pt-2">
      <Button size="2" highContrast>
        {isEditable ? 'Update' : 'Save'}
      </Button>
    </Flex>
  )
}

export { SaveButton }

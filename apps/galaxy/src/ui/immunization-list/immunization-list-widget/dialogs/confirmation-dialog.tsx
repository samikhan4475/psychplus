import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'

interface ConfirmationDialogProps {
  isOpen: boolean
  closeDialog: () => void
  onConfirmation: () => void
  heading: string
}

const ConfirmationDialog = ({
  isOpen,
  closeDialog,
  onConfirmation,
  heading,
}: ConfirmationDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content className="relative max-w-[550px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title>
          <Text>{heading}</Text>
        </Dialog.Title>
          <Flex gap="3" justify="end" mt="5">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button size="2" highContrast onClick={onConfirmation}>
              Yes
            </Button>
          </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ConfirmationDialog }

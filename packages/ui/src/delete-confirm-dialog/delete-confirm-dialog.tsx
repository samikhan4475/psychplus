import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'

const DeleteConfirmDialog = ({ isOpen, closeDialog, onDelete }: any) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (dialogNewState === false && isOpen === true) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="relative max-w-[550px]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title>
          <Text>Are you sure?</Text>
        </Dialog.Title>
        <Dialog.Description>
          Are you sure you want to delete this record? This cannot be undone.
        </Dialog.Description>

        <Flex gap="3" justify="end" mt="5">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button size="2" className="bg-[#E5484D]" onClick={onDelete}>
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { DeleteConfirmDialog }

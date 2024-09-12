import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { RowDelete } from '../types'

const RowDeleteConfirmDialog = ({
  isOpen,
  closeDialog,
  deleteHandler,
  handlerCanceled,
}: RowDelete) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (dialogNewState === false && isOpen) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="relative w-full max-w-[648px] rounded-6 px-[28px] py-[20px] text-[#151B4A]">
        <Dialog.Close className="absolute right-7 top-7 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          <Text className="text-[20px] font-bold">
            Are you sure you want to delete?
          </Text>
        </Dialog.Title>
        <Text className="text-4">
          Do you really want to delete this record? The action cannot be undone.
        </Text>
        <Flex justify="end" width="100%" gap="2" className="mt-[38px]">
          <Dialog.Close>
            <Button
              variant="outline"
              onClick={handlerCanceled}
              className="cursor-pointer border border-solid border-[#9E9898] shadow-[0_0_0_rgba(0,0,0,0)] "
            >
              <Text className="text-[#000000] opacity-80">Cancel</Text>
            </Button>
          </Dialog.Close>
          <Button
            className="cursor-pointer bg-[#E5484D] text-[#ffffff]"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowDeleteConfirmDialog }

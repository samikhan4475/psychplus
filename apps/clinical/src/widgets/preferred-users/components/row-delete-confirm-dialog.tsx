import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Dialog } from 'node_modules/@psychplus/ui/src/dialog'
import { deleteActiveUser, deleteWorklistUser } from '../api'
import { useStore } from '../store'

const RowDeleteConfirmDialog = ({ isOpen, closeDialog, id, actionOf }: any) => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const deleteUser = () => {
    let deleteUserPromise;

    if (actionOf === 'worklist') {
        deleteUserPromise = deleteWorklistUser(preferredPartnerId, id);
    } else {
        deleteUserPromise = deleteActiveUser(preferredPartnerId, id);
    }

    deleteUserPromise.then(() => {
      //Refresh the page
    })
  }
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (dialogNewState === false && isOpen === true) {
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
              className="cursor-pointer border border-solid border-[#9E9898] shadow-[0_0_0_rgba(0,0,0,0)] "
            >
              <span className="text-[#000000] opacity-80">Cancel</span>
            </Button>
          </Dialog.Close>

          <Button
            className="cursor-pointer bg-[#E5484D] text-[#ffffff]"
            onClick={deleteUser}
          >
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowDeleteConfirmDialog }

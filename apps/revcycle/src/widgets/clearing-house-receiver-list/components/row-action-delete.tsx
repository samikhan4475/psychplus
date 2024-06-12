import { useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Dialog } from 'node_modules/@psychplus/ui/src/dialog'
import { deleteClearingHouseReceiver } from '../api'
import { ClearingHouseReceiver } from '../types'

const RowActionDelete = ({
  row,
  isOpen,
  closeDialog,
}: {
  row: ClearingHouseReceiver
  isOpen: boolean
  closeDialog: () => void
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false)

  const deleteRecord = async () => {
    setDeleteLoading(true)
    try {
      await deleteClearingHouseReceiver(row.id)
    } catch (error) {
      let message = ''
      if (typeof error === 'string') {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      } else {
        message = JSON.stringify(error)
      }
      alert(`ERROR: ${message}`)
      window.location.replace(`/widgets/clearing-house-receiver-list`)
    } finally {
      setDeleteLoading(false)
      window.location.replace(`/widgets/clearing-house-receiver-list`)
    }
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
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
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
            onClick={deleteRecord}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Wait...' : 'Delete'}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionDelete }

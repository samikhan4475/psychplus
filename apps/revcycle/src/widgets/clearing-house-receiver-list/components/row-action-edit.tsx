import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from 'node_modules/@psychplus/ui/src/dialog'
import { ClearingHouseReceiverForm } from '@/widgets/clearing-house-receiver-dialog/components/clearing-house-receiver-form'
import { useStore } from '../store'
import { ClearingHouseReceiver } from '../types'

const RowActionEdit = ({
  row,
  isOpen,
  closeDialog,
}: {
  row: ClearingHouseReceiver
  isOpen: boolean
  closeDialog: () => void
}) => {
  const usStatesCodeSets = useStore((state) => state.usStatesCodeSets)
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) =>
        !dialogNewState && isOpen && closeDialog()
      }
    >
      <Dialog.Content className="relative max-w-[1000px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">Edit Receiver</Dialog.Title>
        <ClearingHouseReceiverForm
          data={row}
          isEdit={true}
          usStatesCodeSets={usStatesCodeSets}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionEdit }

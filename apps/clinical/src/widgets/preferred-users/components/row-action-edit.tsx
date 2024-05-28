import { Cross2Icon } from '@radix-ui/react-icons'
import { Text } from '@radix-ui/themes'
import { Dialog } from 'node_modules/@psychplus/ui/src/dialog'
import { EditRecordFormFields } from './edit-record-form-fields'

const RowActionEdit = ({
  row: { original: preferredPartnerPatient },
  isOpen,
  closeDialog,
}: any) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(dialogNewState) => {
        if (dialogNewState === false && isOpen === true) {
          closeDialog()
        }
      }}
    >
      <Dialog.Content className="relative w-full max-w-[768px] rounded-6 px-[28px] py-[20px] text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">
          <Text className="text-[20px] font-bold">Edit Active User</Text>
        </Dialog.Title>
        <EditRecordFormFields data={preferredPartnerPatient} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionEdit }

import { Cross2Icon } from '@radix-ui/react-icons'
import { Dialog } from 'node_modules/@psychplus/ui/src/dialog'
import { PreferredPartnerForm } from '@/widgets/preferred-partners-dialog/components/preferred-partner-form'

const RowActionEdit = ({
  row: { original: preferredPartners },
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
      <Dialog.Content className="relative max-w-[720px] rounded-6 p-12 font-bold text-[#151B4A]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>
        <Dialog.Title size="8">Edit Preferred Partner</Dialog.Title>
        <PreferredPartnerForm data={preferredPartners} isEdit={true} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RowActionEdit }

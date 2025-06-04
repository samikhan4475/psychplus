import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { SubmitHandler } from 'react-hook-form'
import { ProviderSchemaType } from '../schema'
import { ChangeProviderForm } from './transfer-patients-form'

const TransferPatientsPopup = ({
  isPopupOpen,
  providerType,
  onClose,
  staffId,
  onSubmit,
}: {
  isPopupOpen: boolean
  providerType: string
  onClose: (open: boolean) => void
  staffId: string
  onSubmit: SubmitHandler<ProviderSchemaType>
}) => {
  const onOpenChange = (isOpen: boolean): void => {
    if (!isOpen) {
      onClose(false)
    }
  }

  return (
    <Dialog.Root open={isPopupOpen} onOpenChange={onOpenChange}>
      <Dialog.Content className="max-h-[600px] max-w-[646px] rounded-4 p-6 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" weight="bold">
          Transfer Patients
        </Dialog.Title>
        <ChangeProviderForm
          providerType={providerType}
          onSubmit={onSubmit}
          staffId={staffId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { TransferPatientsPopup }

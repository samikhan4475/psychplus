import { useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { LabOrders } from '@/types'
import { AddLabOrderForm } from './add-lab-order-form'
import { LabOrderEditPopupButton } from './lab-order-edit-popup-button'
import { LabOrderPopupButton } from './lab-order-popup-button'

const AddLabOrderPopup = ({
  isEdit,
  labOrderData,
}: {
  isEdit: boolean
  labOrderData?: LabOrders
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpen(false)
        }
      }}
    >
      {!isEdit && <LabOrderPopupButton setOpen={setOpen} />}
      {isEdit && <LabOrderEditPopupButton setOpen={setOpen} />}
      <Dialog.Content className="max-h-[600px] max-w-[820px] rounded-4 p-6 [box-shadow:none]">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" weight="bold">
          {isEdit ? 'Edit Lab Order' : 'Add Lab Order'}
        </Dialog.Title>
        <AddLabOrderForm labOrderData={labOrderData} setOpen={setOpen} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddLabOrderPopup }

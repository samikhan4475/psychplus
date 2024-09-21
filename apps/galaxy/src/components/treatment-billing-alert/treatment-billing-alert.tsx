'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { StaffComment } from '@/types'
import { TreatmentBillingAlertTable } from './treatment-billing-alert-table'

interface TreatmentBillingAlertProps {
  isOpen: boolean
  closeDialog: () => void
  data: StaffComment[]
  title: 'Billing' | 'Treatment'
}

const TreatmentBillingAlert = ({
  isOpen,
  closeDialog,
  title,
  data,
}: TreatmentBillingAlertProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content className="bg-pp-warning-bg-1 max-w-[857px] rounded-4 p-5">
        <Dialog.Title size="3" className="mb-2">
          {title} Alert!
        </Dialog.Title>
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <TreatmentBillingAlertTable data={data}/>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { TreatmentBillingAlert }

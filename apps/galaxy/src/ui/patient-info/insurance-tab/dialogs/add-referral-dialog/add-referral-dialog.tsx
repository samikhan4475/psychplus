'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { AddReferralForm } from './add-referral-form'

interface AddReferralDialogProps {
  open?: boolean
  onClose?: () => void
}
const AddReferralDialog = ({ open, onClose }: AddReferralDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[753px] rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Add Referral/Authorization
        </Dialog.Title>
        <AddReferralForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { AddReferralDialog }

'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { InsuranceHistory } from './insurance-history'

interface HistoryDetailsDialogProps {
  open?: boolean
  onClose?(): void
  patientId: string
  policyId: string
  title:string
}
const HistoryDetailsDialog = ({
  open,
  onClose,
  patientId,
  policyId,
  title
}: HistoryDetailsDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content
        className="relative max-w-[743px] rounded-2 px-6 py-4"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Dialog.Title size="4">Insurance History - {title ?? ''}</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <InsuranceHistory patientId={patientId} policyId={policyId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HistoryDetailsDialog }

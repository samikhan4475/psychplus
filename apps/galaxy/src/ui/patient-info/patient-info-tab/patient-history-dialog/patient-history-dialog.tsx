'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { HistoryIcon, X } from 'lucide-react'
import { PatientInfoHistory } from './patient-info-history'

interface PatientHistoryDialogProps {
  patientPolicyAStatus?: string
  patientId: string
}
const PatientHistoryDialog = ({
  patientId,
  patientPolicyAStatus,
}: PatientHistoryDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="1" color="gray" variant="outline" type="button">
          <HistoryIcon width={15} height={15} strokeWidth={1.75} />
          Patient Info Hx
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        className="relative max-w-[1273px] rounded-2 py-4 pl-6 pr-4"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Dialog.Title size="4">Patient Hx</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <PatientInfoHistory
          patientId={patientId}
          patientPolicyAStatus={patientPolicyAStatus}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PatientHistoryDialog }

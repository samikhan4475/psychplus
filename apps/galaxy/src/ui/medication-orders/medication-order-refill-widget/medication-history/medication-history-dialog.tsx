'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { HistoryIcon } from 'lucide-react'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { MedicationHistoryTable } from './medication-history-table'

interface MedicationHistoryDialogProps {
  pharmacyNotificationId: string
}
const MedicationHistoryDialog = ({
  pharmacyNotificationId,
}: MedicationHistoryDialogProps) => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button
          color="gray"
          size="1"
          className="text-black border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
          variant="outline"
        >
          <HistoryIcon size="14" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Medication Refill History
        </Dialog.Title>
        <MedicationHistoryTable
          pharmacyNotificationId={pharmacyNotificationId}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { MedicationHistoryDialog }

'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { HistoryView } from './history-view'

interface PcpHistoryDialogProps {
  patientId: string
}
const HistoryButton = ({ patientId }: PcpHistoryDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          Hx
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        className="max-w-[848px] rounded-1 p-6"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Dialog.Title size="4">PCP Hx</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <HistoryView patientId={patientId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HistoryButton }

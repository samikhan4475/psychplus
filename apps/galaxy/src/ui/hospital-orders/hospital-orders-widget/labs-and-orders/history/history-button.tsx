'use client'

import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HistoryView } from './history-view'

interface PatientHistoryDialogProps {
  sectionName: QuickNoteSectionName
}
const HistoryButton = ({ sectionName }: PatientHistoryDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          Hx
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        className="relative"
        maxWidth="80vw"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Dialog.Title size="4">Hospital Orders</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <HistoryView sectionName={sectionName} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HistoryButton }

'use client'

import { Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { FlterForm } from './filter-form'
import { HistoryDetails } from './history-details'
import { HistoryTable } from './history-table'

interface HistoryDetailsDialogProps {
  open?: boolean
  onClose?(): void
}
const HistoryDetailsDialog = ({ open, onClose }: HistoryDetailsDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="relative max-w-[643px] rounded-2 px-6 py-4">
        <Dialog.Title size="4">Insurance History - Medcare</Dialog.Title>
        <Dialog.Close className="absolute right-6 top-4 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Flex direction={'column'} gap="2">
          <FlterForm />
          <Flex gap="2" className="h-full">
            <HistoryTable />
            <HistoryDetails />
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { HistoryDetailsDialog }

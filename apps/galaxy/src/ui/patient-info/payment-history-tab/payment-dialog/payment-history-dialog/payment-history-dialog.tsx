'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { PaymentHistoryTable } from './payment-history-table'
import { PaymentHistoryTablePagination } from './payment-history-table-pagination'

interface PaymentHistoryDialogProps {
  patientId: string
}
const PaymentHistoryDialog = ({ patientId }: PaymentHistoryDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button
          size="1"
          variant="outline"
          color="gray"
          className="border-pp-gray-2 text-black mt-5 border border-solid text-1 font-medium !outline-none [box-shadow:none]"
        >
          <CounterClockwiseClockIcon width={16} height={16} color="gray" />
          Payment Hx
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative max-w-[824px] rounded-1 p-3 py-5 pb-2">
        <Dialog.Close className="absolute right-5 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="px-2 font-[600]">
          Payment Hx
        </Dialog.Title>
        <Flex direction="column" className="h-[calc(100vh_-_400px)] flex-1">
          <PaymentHistoryTable patientId={patientId} />
          <PaymentHistoryTablePagination />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PaymentHistoryDialog }

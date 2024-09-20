'use client'

import React from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Button, Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { HistoryTable } from './history-table'

const PaymentHistoryDialog = () => {
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
      <Dialog.Content className="relative max-w-[824px] rounded-1 p-5 pb-2">
        <Dialog.Close className="absolute right-5 cursor-pointer">
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="5" className="font-[600]">
          Payment Hx
        </Dialog.Title>
        <HistoryTable />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PaymentHistoryDialog }

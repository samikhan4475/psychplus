'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ClockIcon } from '@/components/icons'
import { PayerHistoryTable } from './payer-history-table'

const PayerHistoryDialog = () => {
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>
        <Button variant="outline" size="1" color="gray" className="text-black">
          <ClockIcon />
          History
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Payer History
        </Dialog.Title>
        <PayerHistoryTable />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { PayerHistoryDialog }

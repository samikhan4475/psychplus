'use client'

import { useState } from 'react'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { InsurancePaymentHistoryTable } from './insurance-payment-history-table'

interface DialogProps {
  paymentId: string
}

const InsurancePaymentHistoryDialog = ({ paymentId }: DialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton variant="ghost" size="1">
          <CounterClockwiseClockIcon color="black" width={16} height={16} />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Insurance Payment History
        </Dialog.Title>
        <InsurancePaymentHistoryTable paymentId={paymentId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { InsurancePaymentHistoryDialog }

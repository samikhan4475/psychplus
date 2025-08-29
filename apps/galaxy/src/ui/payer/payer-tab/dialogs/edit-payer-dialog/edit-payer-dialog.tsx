'use client'

import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { PayerResponse } from '@/types'
import { EditPayerForm } from '.'

interface EditPayerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payer: PayerResponse
}

const EditPayerDialog = ({
  open,
  onOpenChange,
  payer,
}: EditPayerDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="relative max-w-[500px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Edit Payer
        </Dialog.Title>
        <EditPayerForm onCloseModal={onOpenChange} payer={payer} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { EditPayerDialog }

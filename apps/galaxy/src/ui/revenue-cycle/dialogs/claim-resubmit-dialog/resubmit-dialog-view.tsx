import React from 'react'
import { Dialog } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { Claim } from '@/types'
import { ResubmitDialogForm } from './resubmit-dialog-form'

interface ClaimReSubmitDialogProps extends PropsWithRow<Claim> {
  open: boolean
  onToggle: () => void
}

const ClaimReSubmitDialog = ({
  row: { original },
  open,
  onToggle,
}: ClaimReSubmitDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onToggle}>
      <Dialog.Content className="relative max-w-[650px]">
        <CloseDialogTrigger />
        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Resubmit Claim
        </Dialog.Title>
        <ResubmitDialogForm onOpen={onToggle} claim={original} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimReSubmitDialog }

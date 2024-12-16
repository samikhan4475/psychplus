'use client'

import { useState } from 'react'
import { Button, Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ClaimAuditHistoryTable } from './claim-audit-history-table'

interface DialogProps {
  claimId: string
}

const ClaimAuditHistoryDialog = ({ claimId }: DialogProps) => {
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
          Hx
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Claim History
        </Dialog.Title>
        <ClaimAuditHistoryTable claimId={claimId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimAuditHistoryDialog }

'use client'

import { useState } from 'react'
import { Dialog, Text } from '@radix-ui/themes'
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
        <Text
          color="gray"
          className="text-black border-pp-gray-2 rounded-md hover:bg-pp-gray-2 hover:text-black focus:bg-pp-gray-2 focus:text-black h-6 cursor-pointer border border-solid p-3 pt-0 text-2 !outline-none"
        >
          Hx
        </Text>
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

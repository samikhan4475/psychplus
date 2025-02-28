'use client'

import { Dialog } from '@radix-ui/themes'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ClaimNoteHistoryTable } from './claim-note-history-table'

interface DialogProps {
  claimNoteId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ClaimNotesAuditDialog = ({
  claimNoteId,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="relative max-w-[1000px]">
        <CloseDialogTrigger />

        <Dialog.Title className="font-sans -tracking-[0.25px]">
          Note History
        </Dialog.Title>
        <ClaimNoteHistoryTable claimNoteId={claimNoteId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimNotesAuditDialog }

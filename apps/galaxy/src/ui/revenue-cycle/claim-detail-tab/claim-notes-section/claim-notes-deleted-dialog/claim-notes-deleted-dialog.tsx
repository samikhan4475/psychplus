'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ClaimNotesDeletedTable } from './claim-notes-deleted-table'

interface ClaimDeletedNotesDialogProps {
  claimId: string
  openDialog: boolean
  handleCloseModal: () => void
}

const ClaimDeletedNotesDialog = ({
  claimId,
  openDialog,
  handleCloseModal,
}: ClaimDeletedNotesDialogProps) => {
  return (
    <Dialog.Root open={openDialog} onOpenChange={handleCloseModal}>
      <Dialog.Content className="relative max-w-[900px] !overflow-visible rounded-3 p-6">
        <Dialog.Close className="absolute right-6 top-6 cursor-pointer" >
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          Deleted Notes
        </Dialog.Title>
        <ClaimNotesDeletedTable claimId={claimId} />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimDeletedNotesDialog }

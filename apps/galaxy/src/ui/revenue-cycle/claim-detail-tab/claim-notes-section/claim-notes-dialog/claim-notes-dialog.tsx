'use client'

import { Dialog } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { ClaimNotesResponse } from '@/types'
import { ClaimNotesForm } from './claim-notes-form'

interface ClaimNotesDialogProps {
  isEditMode: boolean
  claimId: string
  row?: ClaimNotesResponse
  openNotesDialog?: boolean
  handleCloseModal: () => void
}
const ClaimNotesDialog = ({
  isEditMode,
  claimId,
  row,
  openNotesDialog,
  handleCloseModal,
}: ClaimNotesDialogProps) => {
  return (
    <Dialog.Root open={openNotesDialog} onOpenChange={handleCloseModal}>
      <Dialog.Content className="relative max-w-[700px] !overflow-visible rounded-3 p-6">
        <Dialog.Close
          className="absolute right-6 top-6 cursor-pointer"
          onClick={() => handleCloseModal()}
        >
          <X size={20} strokeWidth={1.5} />
        </Dialog.Close>
        <Dialog.Title size="6" className="font-medium">
          {isEditMode ? 'Edit Note' : 'Add Note'}
        </Dialog.Title>
        <ClaimNotesForm
          onCloseModal={handleCloseModal}
          claimId={claimId}
          selectedData={row}
          isEditMode={isEditMode}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimNotesDialog }

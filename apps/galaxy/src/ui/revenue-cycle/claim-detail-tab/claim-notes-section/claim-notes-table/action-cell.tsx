'use client'

import React, { useState } from 'react'
import { CounterClockwiseClockIcon, Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog } from '@/components'
import { DeleteIcon } from '@/components/icons'
import { ClaimNotesResponse } from '@/types'
import { deleteClaimNotesAction } from '../../actions'
import { useStore } from '../../store'
import { ClaimNotesDialog } from '../claim-notes-dialog'

interface RowActionDropdownProps {
  claimId: string
  row: Row<ClaimNotesResponse>
}
const ClaimNotesRowAction: React.FC<RowActionDropdownProps> = ({
  claimId,
  row,
}) => {
  const { search, setOpenClaimNotesAudit, setClaimNotesId } = useStore(
    (state) => ({
      search: state.search,
      setOpenClaimNotesAudit: state.setOpenClaimNotesAudit,
      setClaimNotesId: state.setClaimNotesId,
      openClaimNotesAudit: state.openClaimNotesAudit,
    }),
  )
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleDeleteClaimNotes = async () => {
    const { id } = row.original
    setLoading(true)
    const result = await deleteClaimNotesAction(id ?? '', claimId)
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete Claim Note')
    } else if (result.state === 'success') {
      toast.success('Claim Note deleted successfully')
      const requestedPayload = {
        claimId: claimId,
        recordStatuses: ['Active'],
        isAlert: [true, false],
      }
      search(requestedPayload)
    }
    setLoading(false)
  }
  const toggleOpen = (open: boolean) => {
    setOpen(open)
  }
  const [openNotesDialog, setOpenNotesDialog] = useState(false)

  const handleEditClick = () => {
    setClaimNotesId(row.original.id ?? '')
    setOpenClaimNotesAudit(true)
  }

  const isEditable = (createdOn: string | undefined): boolean => {
    if (!createdOn) return true
    const createdDate = new Date(createdOn)
    const now = new Date()
    const timeDifference = now.getTime() - createdDate.getTime()
    const hoursDifference = timeDifference / (1000 * 60 * 60)

    return hoursDifference <= 24
  }
  return (
    <Flex gap="1" align="center" justify="end" className="flex-1">
      <IconButton
        variant="ghost"
        type="button"
        className="text-pp-gray-1"
        onClick={handleEditClick}
      >
        <CounterClockwiseClockIcon />
      </IconButton>
      {isEditable(row?.original?.metadata?.createdOn) && (
        <>
          <ClaimNotesDialog
            openNotesDialog={openNotesDialog}
            isEditMode={true}
            claimId={claimId}
            row={row?.original}
            handleCloseModal={() => setOpenNotesDialog(false)}
          />
          <IconButton
            type="button"
            variant="ghost"
            onClick={() => setOpenNotesDialog(true)}
          >
            <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
          </IconButton>
        </>
      )}
      {isEditable(row?.original?.metadata?.createdOn) && (
        <DeleteConfirmDialog
          isOpen={open}
          toggleOpen={toggleOpen}
          onDelete={handleDeleteClaimNotes}
          loading={loading}
          title="note"
        >
          <IconButton variant="ghost" type="button">
            <DeleteIcon height={18} />
          </IconButton>
        </DeleteConfirmDialog>
      )}
    </Flex>
  )
}

export { ClaimNotesRowAction }

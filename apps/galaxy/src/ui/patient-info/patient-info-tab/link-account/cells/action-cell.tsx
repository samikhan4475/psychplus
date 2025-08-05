'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { PatientLink } from '@/types'
import { deleteLinkAccount } from '../actions'
import { UnlinkAccountConfrimationDialog } from '../unlink-account-confirmation-modal'

interface ActionsCellProps {
  row: Row<PatientLink>
  refetchList: () => void
}
const ActionsCell = ({ row, refetchList }: ActionsCellProps) => {
  const [unlinkDialog, setUnlinkDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDeleteLinkAccount = async () => {
    setIsLoading(true)
    const { id } = row.original
    const result = await deleteLinkAccount(id.toString())
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete linked account')
    } else {
      toast.success('Linked account deleted successfully.')
      refetchList()
    }
    setIsLoading(false)
  }

  const handleReloadClaim = async () => {
    await handleDeleteLinkAccount()
    setUnlinkDialog(false)
  }
  return (
    <>
      {unlinkDialog && (
        <UnlinkAccountConfrimationDialog
          isLoading={isLoading}
          isOpen={unlinkDialog}
          onConfirm={handleReloadClaim}
          toggleOpen={() => setUnlinkDialog(false)}
          title={`${row.original?.nonSurvivorPatientName?.firstName} ${row.original?.nonSurvivorPatientName?.lastName}`}
        />
      )}
      <Button
        type="button"
        size="1"
        highContrast
        onClick={() => setUnlinkDialog(true)}
      >
        Unlink
      </Button>
    </>
  )
}
export { ActionsCell }

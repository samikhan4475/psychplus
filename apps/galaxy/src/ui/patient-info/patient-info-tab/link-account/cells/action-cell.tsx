'use client'

import { Button } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { PatientLink } from '@/types'
import { deleteLinkAccount } from '../actions'

interface ActionsCellProps {
  row: Row<PatientLink>
  refetchList: () => void
}
const ActionsCell = ({ row, refetchList }: ActionsCellProps) => {
  const handleDeleteLinkAccount = async () => {
    const { id } = row.original
    const result = await deleteLinkAccount(id.toString())
    if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to delete linked account')
    } else {
      toast.success('Link Account deleted successfully')
      refetchList()
    }
  }
  return (
    <Button
      type="button"
      size="1"
      highContrast
      onClick={handleDeleteLinkAccount}
    >
      Unlink
    </Button>
  )
}
export { ActionsCell }

'use client'

import { useSearchParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { LabResult } from '@/types'
import { deleteLabOrderResultAction } from '../actions/delete-lab-order-result'
import { DeleteDialog } from '../delete-dialogue/delete-dialogue'
import { useStore } from '../store'

interface ViewActiondeleteProps {
  row: Row<LabResult>
}

const ViewActionDelete = ({ row }: ViewActiondeleteProps) => {
  const { deleteLabOrders } = useStore()
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  const handleDelete = async () => {
    const response = await deleteLabOrderResultAction(
      appointmentId!,
      row.original.orderId!,
      row.original.id!,
    )
    if (response.state === 'error') {
      toast.error('Error deleting lab result')
    } else {
      toast.success('Lab Result Deleted')
      deleteLabOrders(row.original)
    }
  }

  return (
    <IconButton size="1" color="gray" variant="ghost" type="button">
      <DeleteDialog handleDelete={handleDelete} />
    </IconButton>
  )
}

export { ViewActionDelete }

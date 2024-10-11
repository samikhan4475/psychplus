'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { STAFF_COMMENT_STATUS, StaffComment } from '@/types'
import { deleteStaffCommentAction } from '@/ui/staff-comments/actions'
import { StaffCommentParams } from '@/ui/visit/types'

const ActionCell = ({
  row: {
    original: { id, appointmentId },
  },
  fetchComments,
}: PropsWithRow<StaffComment> & {
  fetchComments: (payload: StaffCommentParams) => void
}) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    setLoading(true)

    const result = await deleteStaffCommentAction(id)
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }

    toast.success('Comment deleted successfully')
    fetchComments({
      appointmentId: String(appointmentId),
      isTreatment: true,
      isBilling: false,
      recordStatuses: [STAFF_COMMENT_STATUS.Active],
    })

    setLoading(false)
  }
  return (
    <IconButton
      variant="ghost"
      color="gray"
      size="1"
      disabled={loading}
      onClick={handleDelete}
    >
      <Trash2 size={16} />
    </IconButton>
  )
}

export { ActionCell }

'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { useHasPermission } from '@/hooks'
import { STAFF_COMMENT_STATUS, StaffComment } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { deleteStaffCommentAction } from '@/ui/staff-comments/actions'
import { ADD_DELETE_STAFF_COMMENT_EDIT_VISIT_POPUP } from '@/ui/visit/constants'
import { StaffCommentParams } from '@/ui/visit/types'

const ActionCell = ({
  row: {
    original: { id, appointmentId },
  },
  fetchComments,
}: PropsWithRow<StaffComment> & {
  fetchComments: (payload: StaffCommentParams) => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const canAddDeleteStaffComment = useHasPermission(
    'staffCommentAddDeleteEditVisitPopup',
  )
  const handleDelete = async () => {
    if (!canAddDeleteStaffComment) {
      return setIsOpen(true)
    }
    setLoading(true)

    const result = await deleteStaffCommentAction(id)
    if (result.state === 'error') {
      toast.error(result.error || 'Failed to delete comment')
      return
    }

    toast.success('Comment deleted successfully')
    fetchComments({
      appointmentId,
      isTreatment: false,
      isBilling: true,
      recordStatuses: [STAFF_COMMENT_STATUS.Active],
    })

    setLoading(false)
  }
  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={ADD_DELETE_STAFF_COMMENT_EDIT_VISIT_POPUP}
      />
      <IconButton
        variant="ghost"
        color="gray"
        size="1"
        disabled={loading}
        onClick={handleDelete}
      >
        <Trash2 size={16} />
      </IconButton>
    </>
  )
}

export { ActionCell }

'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { StaffComment } from '@/types'
import { deleteStaffCommentAction } from '../../actions'
import { useStore } from '../../store'

const ActionCell = ({
  row: {
    original: { recordStatus, id, patientId },
  },
}: PropsWithRow<StaffComment>) => {
  const { fetchComments, activeTab } = useStore((state) => ({
    fetchComments: state.fetchComments,
    activeTab: state.activeTab,
  }))
  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    const isBilling = activeTab === 'Billing'

    setLoading(true)

    const result = await deleteStaffCommentAction(id)
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }

    toast.success('Comment deleted successfully')
    fetchComments({
      PatientId: String(patientId),
      IsTreatment: !isBilling,
      IsBilling: isBilling,
    })

    setLoading(false)
  }
  return (
    <IconButton
      variant="ghost"
      color="gray"
      size="1"
      disabled={recordStatus === 'Deleted' || loading}
      onClick={handleDelete}
    >
      <Trash2 size={16} />
    </IconButton>
  )
}

export { ActionCell }

'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { StaffComment } from '@/types'
import { deleteStaffCommentAction } from '../../actions'
import { BILLING_TAB } from '../../constants'
import { useStore } from '../../store'

const ActionCell = ({
  row: {
    original: { recordStatus, id },
  },
}: PropsWithRow<StaffComment>) => {
  const store = useStore()
  const { fetchComments, activeTab } = zustandUseStore(store, (state) => ({
    fetchComments: state.fetchComments,
    activeTab: state.activeTab,
  }))

  const [loading, setLoading] = useState<boolean>(false)

  const handleDelete = async () => {
    const isBilling = activeTab === BILLING_TAB

    setLoading(true)

    const result = await deleteStaffCommentAction(id)
    if (result.state === 'error') {
      toast.error(result.error)
      return
    }

    toast.success('Comment deleted successfully')
    fetchComments({
      isTreatment: !isBilling,
      isBilling: isBilling,
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

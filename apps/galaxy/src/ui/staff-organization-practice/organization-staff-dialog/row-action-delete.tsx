'use client'

import { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { detachPracticeAction } from '../actions'
import { useStore } from '../store'
import { Practice } from '../types'

const RowActionDeletePractice = ({
  row: { original: record },
}: PropsWithRow<Practice>) => {
  const { staff, searchDialogPractices, currentUserId } = useStore((state) => ({
    staff: state.staff,
    searchDialogPractices: state.searchDialogPractices,
    currentUserId: state.currentUserId,
  }))
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteRecord = async () => {
    if (!currentUserId) {
      return
    }
    setLoading(true)
    const response = await detachPracticeAction(
      {
        roleIds: staff?.staffUserRoleIds ?? [],
      },
      `${currentUserId}`,
      record.id,
    )

    if (response.state === 'error') {
      toast.error(response.error ?? 'Failed to delete the record')
      return
    }
    searchDialogPractices({
      organizationId: record.organizationId,
      staffuserId: currentUserId,
    })
    setOpen(false)
    setLoading(false)
    toast.success('The practice is successfully detached')
  }

  const toggleOpen = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DeleteConfirmDialog
      isOpen={open}
      toggleOpen={toggleOpen}
      onDelete={deleteRecord}
      loading={loading}
      title="practice"
    >
      <IconButton size="1" color="gray" variant="ghost">
        <TrashIcon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionDeletePractice }

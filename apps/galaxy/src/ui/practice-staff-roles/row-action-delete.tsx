'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { Role } from '@/types'
import { detachPracticeAction } from './actions'
import { useStore } from './store'

const RowActionDeletePractice = ({
  row: { original: record },
}: PropsWithRow<Role>) => {
  const { id } = useParams<{ id: string }>()
  const { selectedStaffId, search } = useStore((state) => ({
    selectedStaffId: state.selectedStaffId,
    search: state.search,
  }))
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const toggle = (open: boolean) => {
    setOpen(open)
  }

  const deleteRoleRecord = async () => {
    if (selectedStaffId) {
      setLoading(true)
      const response = await detachPracticeAction(
        {
          roleIds: [record.id],
        },
        selectedStaffId,
        id,
      )

      if (response.state === 'error') {
        toast.error(response.error ?? 'Failed to delete the record')
        return
      }
      search(id, selectedStaffId)
      setOpen(false)
      setLoading(false)
      toast.success('The role is successfully detached')
    }
  }

  return (
    <DeleteConfirmDialog
      isOpen={open}
      toggleOpen={toggle}
      onDelete={deleteRoleRecord}
      loading={loading}
      title="role"
    >
      <IconButton size="1" color="gray" variant="ghost">
        <TrashIcon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionDeletePractice }

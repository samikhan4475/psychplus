'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { DeleteConfirmDialog } from '@/components'
import { Role } from '@/types'
import { detachOrganizationAction } from './actions'
import { useStore } from './store'

interface RowActionDeleteProps {
  record: Role
}

const RowActionDeletePractice = ({ record }: RowActionDeleteProps) => {
  const { id } = useParams<{ id: string }>()
  const { search, selectedStaffId } = useStore((state) => ({
    search: state.search,
    selectedStaffId: state.selectedStaffId,
  }))
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteRecord = async () => {
    if (selectedStaffId) {
      setLoading(true)
      const response = await detachOrganizationAction(
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

  const toggleOpen = (open: boolean) => {
    setOpen(open)
  }

  return (
    <DeleteConfirmDialog
      isOpen={open}
      toggleOpen={toggleOpen}
      onDelete={deleteRecord}
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

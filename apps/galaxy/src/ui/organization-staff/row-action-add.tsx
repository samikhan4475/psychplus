'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { deleteStaffAction } from './actions'
import { useStore } from './store'
import { Staff } from './types'

const RowActionAddPractice = ({
  row: { original: staff },
}: PropsWithRow<Staff>) => {
  const { id } = useParams<{ id: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
  }))
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteRecord = async () => {
    if (staff.id) {
      setLoading(true)
      const result = await deleteStaffAction(staff.id)
      if (result.state === 'error') {
        toast.error(result.error ?? 'Failed to delete the record')
      } else if (result.state === 'success') {
        toast.success('The record has been deleted successfully')
        search({
          organizationsIds: [id],
        })
      }
      setLoading(false)
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
      title="staff"
    >
      <IconButton size="1" color="gray" variant="ghost">
        <TrashIcon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionAddPractice }

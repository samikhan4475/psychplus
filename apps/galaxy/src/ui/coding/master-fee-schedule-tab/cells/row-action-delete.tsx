'use client'

import { useState } from 'react'
import { TrashIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { deleteMasterFeeScheduleAction } from '../../actions'
import { CPT } from '../../types'
import { useStore } from '../store'

const RowActionDelete = ({ row: { original: cpt } }: PropsWithRow<CPT>) => {
  const search = useStore((state) => state.search)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const deleteRecord = async () => {
    if (cpt.id) {
      setLoading(true)
      const result = await deleteMasterFeeScheduleAction(cpt.id)
      if (result.state === 'error') {
        toast.error(result.error ?? 'Failed to delete the record')
      } else if (result.state === 'success') {
        toast.success('The record has been deleted successfully')
        search({})
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
      title="master fee schedule record"
    >
      <IconButton size="1" color="gray" variant="ghost">
        <TrashIcon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionDelete }

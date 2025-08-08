'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { IconButton } from '@radix-ui/themes'
import { TrashIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { deletePracticePlanAddressAction } from '../actions'
import { PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE } from '../constants'
import { useStore } from '../store'
import { PracticePlanAddress } from '../types'

const RowActionDelete = ({ row }: PropsWithRow<PracticePlanAddress>) => {
  const { id: practicePlanId } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const search = useStore((state) => state.search)
  const [isOpen, setIsOpen] = useState(false)

  const deleteRecord = async () => {
    setLoading(true)
    const result = await deletePracticePlanAddressAction(
      row.original,
      practicePlanId,
    )
    setLoading(false)
    if (result.state === 'error')
      return toast.error(
        result.error ?? 'Failed to delete practice plan address',
      )
    toast.success('Practice plan address deleted successfully')
    setIsOpen(false)

    search({ practicePlanId }, 1, PRACTICE_PLAN_ADDRESS_TABLE_PAGE_SIZE, true)
  }
  const onOpen = () => setIsOpen(!isOpen)

  return (
    <DeleteConfirmDialog
      isOpen={isOpen}
      loading={loading}
      onDelete={deleteRecord}
      toggleOpen={onOpen}
    >
      <IconButton size="1" color="gray" variant="ghost">
        <TrashIcon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionDelete }

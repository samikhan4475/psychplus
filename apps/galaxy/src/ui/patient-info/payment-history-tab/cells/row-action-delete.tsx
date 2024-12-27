'use client'

import { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog, type PropsWithRow } from '@/components'
import { deletePatientTransactionAction } from '../actions/delete-patient-transaction'
import { useStore } from '../store'
import type { PatientTransaction } from '../types'

const RowActionDelete = ({
  row: {
    original: { patientId, id },
  },
}: PropsWithRow<PatientTransaction>) => {
  const [isOpen, setIsOpen] = useState(false)
  const refetch = useStore((state) => state.refetch)

  const [isLoading, setIsLoading] = useState(false)
  const toggleOpen = (open: boolean) => setIsOpen(open)

  const handleDelete = async () => {
    setIsLoading(true)
    const result = await deletePatientTransactionAction(patientId, id)

    if (result.state === 'error') {
      toast.error(result.error)
    } else if (result.state === 'success') {
      refetch()
      toggleOpen(false)
      toast.success('Transaction deleted successfully!')
    }
    setIsLoading(false)
  }

  return (
    <DeleteConfirmDialog
      isOpen={isOpen}
      onDelete={handleDelete}
      loading={isLoading}
      toggleOpen={toggleOpen}
    >
      <IconButton
        disabled={isLoading}
        size="1"
        variant="ghost"
        color="gray"
        className="text-black disabled:text-pp-gray-3"
      >
        <Trash2 height={12} width={12} />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { RowActionDelete }

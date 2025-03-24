'use client'

import React, { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { Service } from '@/types'
import { deleteServiceAction } from './actions'
import { AlertDialog } from './alert-dialog'
import { useStore } from './store'

const DeleteServiceButton = ({ row }: PropsWithRow<Service>) => {
  const { locationId, id } = row.original
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const refetch = useStore((state) => state.refetch)

  const handleDelete = async () => {
    setLoading(true)
    const result = await deleteServiceAction(locationId, String(id))
    if (result.state === 'error') {
      setLoading(false)
      return toast.error(result.error)
    }
    toast.success('Deleted Successfully')
    setLoading(false)
    setIsDialogOpen(false)
    refetch()
  }

  return (
    <>
      <IconButton
        variant="ghost"
        onClick={() => setIsDialogOpen(true)}
        size="1"
        color="gray"
        highContrast
        disabled={loading}
      >
        <Trash2 width={16} height={16} />
      </IconButton>

      <AlertDialog
        isOpen={isDialogOpen}
        closeDialog={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </>
  )
}

export { DeleteServiceButton }

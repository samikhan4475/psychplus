'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { type PropsWithRow } from '@/components'
import { DeleteIcon } from '@/components/icons'
import { deleteImmunizationAction } from '../actions'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'
import { useStore } from '../store/store'
import { ImmunizationDataResponse } from '../types'

const RowActionDelete = ({
  row: { original: record },
}: PropsWithRow<ImmunizationDataResponse>) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { appointmentId, fetchImmunizations } = useStore(
    ({ appointmentId, fetchImmunizations }) => ({
      appointmentId,
      fetchImmunizations,
    }),
  )

  const handleClick = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleDelete = async () => {
    if (!appointmentId) return
    setIsLoading(true)
    const result = await deleteImmunizationAction({
      id: record.id,
      appointmentId: appointmentId,
    })

    setIsLoading(false)

    if (result.state === 'error') {
      toast.error(result.error || 'Failed to delete immunization')
      return
    }

    toast.success('Immunization deleted successfully')
    if (appointmentId) fetchImmunizations(appointmentId)
  }

  return (
    <>
      <Tooltip content="Delete immunization">
        <IconButton
          size="1"
          color="red"
          variant="ghost"
          onClick={handleClick}
          disabled={isLoading}
        >
          <DeleteIcon width={16} height={16} />
        </IconButton>
      </Tooltip>

      <ConfirmationDialog
        isOpen={open}
        closeDialog={handleClose}
        onConfirmation={handleDelete}
        heading="Delete Immunization"
      />
    </>
  )
}

export { RowActionDelete }

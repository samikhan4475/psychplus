'use client'

import { useState } from 'react'
import { Button, Flex, Spinner } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { Appointment } from '@/types'
import { deleteActiveVisit } from './actions'

interface DeleteButtonProps {
  selectedVisits: Row<Appointment>[]
  onDelete: () => void
}

const DeleteButton = ({ selectedVisits, onDelete }: DeleteButtonProps) => {
  const [loading, setLoading] = useState(false)
  const handleBulkDelete = async () => {
    setLoading(true)
    const responses = await Promise.all(
      selectedVisits.map(({ original: { patientId, appointmentId } }) =>
        deleteActiveVisit({ patientId, appointmentId }),
      ),
    )
    if (responses.some((response) => response.state === 'error')) {
      setLoading(false)
      return toast.error('Failed to cancel visits')
    }
    setLoading(false)
    toast.success('Visits cancelled successfully')
    onDelete()
  }

  return (
    <Flex direction="row" justify="start" mb="1">
      {selectedVisits.length > 0 && (
        <Button
          variant="outline"
          color="red"
          size="1"
          onClick={handleBulkDelete}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="1" /> Canceling...
            </>
          ) : (
            `Cancel ${selectedVisits.length} Visit(s)`
          )}
        </Button>
      )}
    </Flex>
  )
}

export { DeleteButton }

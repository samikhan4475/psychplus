'use client'

import { Button } from '@radix-ui/themes'
import { deleteAllDocumentsAction } from './actions'
import { Documents } from './types'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface DocumentsClearButtonProps {
  documents: Documents[]
  patientId: number
  appointmentId: number
  onClearSuccess: () => void
}

const DocumentsClearButton = ({
  documents,
  patientId,
  appointmentId,
  onClearSuccess,
}: DocumentsClearButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteAll = async () => {
    const documentIds = documents
      .filter(({ documentId }) => !!documentId)
      .map(({ documentId }) => documentId as string)

    if (documentIds.length === 0) {
      toast.error('No documents to clear.')
      return
    }

    setIsLoading(true)
    const result = await deleteAllDocumentsAction({
      patientId: patientId,
      appointmentId: appointmentId,
      data: documentIds,
    })

    if (result.state === 'success') {
      toast.success('Documents successfully deleted.')
      onClearSuccess()
    } else {
      toast.error('Failed to delete documents.')
    }

  }

  return (
    <Button
      variant="outline"
      size="1"
      color="gray"
      className="text-black"
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault()
        handleDeleteAll()
      }}
    >
      {isLoading ? 'Clearing' : 'Clear'}
    </Button>
  )
}

export { DocumentsClearButton }

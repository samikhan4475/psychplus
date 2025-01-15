'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { AlertDialog } from '../assessment-plan/alert-dialog'
import { getAllDocumentsAction } from './client-actions'
import { Documents } from './types'
import { UploadedDocumentTab } from './uploaded-documents-tab'

interface UploadedDocumentsClientWidgetProps {
  patientId: string
  appointmentId?: string
}

const UploadedDocumentsClientWidget = ({
  patientId,
  appointmentId,
}: UploadedDocumentsClientWidgetProps) => {
  const [error, setError] = useState('')
  const [data, setData] = useState<Documents[]>([])
  useEffect(() => {
    getAllDocumentsAction({
      data: {
        appointmentId: Number(appointmentId),
        patientId: Number(patientId),
        documentType: 'Primary',
      },
      patientId: Number(patientId),
      appointmentId: Number(appointmentId),
    }).then((response) => {
      if (response.state === 'error') {
        return setError(response.error)
      }
      setData(response?.data ?? [])
    })
  }, [appointmentId, patientId])

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <>
      <UploadedDocumentTab patientId={patientId} uploadedDocumentsData={data} />
      <AlertDialog />
    </>
  )
}

export { UploadedDocumentsClientWidget }

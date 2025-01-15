'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { getAllDocumentsAction } from '@/ui/uploaded-documents/actions'
import { Documents } from '@/ui/uploaded-documents/types'
import { Details } from './details'

type UploadedDocumentProps = {
  patientId: string
  appointmentId: string
}

const UploadedDocumentClientView = ({
  patientId,
  appointmentId,
}: UploadedDocumentProps) => {
  const [data, setData] = useState<Documents[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    getAllDocumentsAction({
      data: {
        appointmentId: Number(appointmentId),
        patientId: Number(patientId),
        documentType: 'Primary',
      },
      patientId: Number(patientId),
      appointmentId: Number(appointmentId),
    })
      .then((response) => {
        if (response.state === 'error') {
          return setError(response.error)
        }
        setData(response?.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [appointmentId, patientId])

  if (loading) {
    return <LoadingPlaceholder className="min-h-28" />
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <Details data={data} appointmentId={appointmentId} patientId={patientId} />
  )
}

export { UploadedDocumentClientView }

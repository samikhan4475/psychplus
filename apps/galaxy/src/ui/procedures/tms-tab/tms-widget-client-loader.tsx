'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { Appointment, QuickNoteHistory, QuickNoteSectionItem } from '@/types'
import { getQuestionnairesHistories } from './client-actions'
import { TmsTab } from './tms-widget'

interface TmsWidgetClientLoaderProps {
  patientId: string
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const TmsWidgetClientLoader = ({
  patientId,
  appointment,
  data,
}: TmsWidgetClientLoaderProps) => {
  const [questionnairesHistories, setQuestionnairesHistories] = useState<
    QuickNoteHistory[]
  >([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getQuestionnairesHistories({ patientId })
      .then((response) => {
        if (response.state === 'error') {
          return setError(response?.error)
        }
        setQuestionnairesHistories(response?.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [patientId])

  if (error) {
    return <Text>{error}</Text>
  }

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  return (
    <TmsTab
      patientId={patientId}
      procedureTmsData={data ?? []}
      questionnaireHistories={questionnairesHistories}
      appointmentData={appointment}
    />
  )
}

export { TmsWidgetClientLoader }

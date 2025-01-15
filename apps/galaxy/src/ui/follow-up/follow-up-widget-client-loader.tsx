'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '../schedule/client-actions'
import { QuicknotesFollowUpWidget } from './quicknotes-follow-up-widget'

interface FollowUpWidgetLoaderProps {
  patientId: string
  appointmentId?: string
}

const FollowUpWidgetLoader = ({
  patientId,
  appointmentId = '',
}: FollowUpWidgetLoaderProps) => {
  const [data, setData] = useState<Appointment[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)

    getBookedAppointmentsAction({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
      isFollowUp: true,
    })
      .then((response) => {
        if (response.state === 'error') {
          setError(response.error)
          return
        }
        setData(response.data)
      })
      .finally(() => setLoading(false))
  }, [patientId, appointmentId])

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <QuicknotesFollowUpWidget
      patientId={patientId}
      appointmentId={appointmentId}
      initialValue={data ?? []}
    />
  )
}

export { FollowUpWidgetLoader }

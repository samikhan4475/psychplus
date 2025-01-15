'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { AddOnWidget } from './add-on-widget'
import { AddOnWidgetSchemaType } from './add-on-widget-schema'
import { getBookedAppointmentAction } from './client-actions'
import { transformIn } from './data'

interface AddOnClientLoaderProps {
  patientId: string
  appointment?: Appointment
  visitType: string
  data?: QuickNoteSectionItem[]
}

const AddOnClientLoader = ({
  patientId,
  appointment,
  visitType,
  data = [],
}: AddOnClientLoaderProps) => {
  const [values, setValues] = useState<AddOnWidgetSchemaType | undefined>(
    undefined,
  )
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getBookedAppointmentAction(appointment)
      .then((response) => {
        if (response.state === 'error') {
          return setError(response?.error)
        }
        const values = transformIn(data, response?.data, visitType)
        setValues(values)
      })
      .finally(() => setLoading(false))
  }, [appointment, data, visitType])

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  if (error) {
    return <Text>{error}</Text>
  }

  if (!values) return null

  return <AddOnWidget patientId={patientId} initialValue={values} />
}

export { AddOnClientLoader }

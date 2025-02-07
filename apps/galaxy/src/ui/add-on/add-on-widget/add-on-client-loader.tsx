'use client'

import { useEffect, useState } from 'react'
import { Text } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { filterAndSort } from '@/utils'
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
  const [otherData, setOtherData] = useState<QuickNoteSectionItem[]>([])
  useEffect(() => {
    getBookedAppointmentAction(appointment).then((response) => {
      if (response.state === 'error') {
        return setError(response?.error)
      }
      const [addOndata, otherData] = filterAndSort(
        data,
        'additionalTherapyDetail',
      )
      const values = transformIn(addOndata, response?.data, visitType)
      setOtherData(otherData)
      setValues(values)
    })
  }, [appointment, data, visitType])

  if (error) {
    return <Text>{error}</Text>
  }

  if (!values) return null

  return (
    <AddOnWidget
      patientId={patientId}
      initialValue={values}
      appointment={appointment}
      otherData={otherData}
    />
  )
}

export { AddOnClientLoader }

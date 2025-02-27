'use client'

import { useEffect, useState } from 'react'
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
  const [appointmentData, setAppointmentData] = useState<Appointment[]>([])
  const [values, setValues] = useState<AddOnWidgetSchemaType>({})
  const [otherData, setOtherData] = useState<QuickNoteSectionItem[]>([])

  useEffect(() => {
    getBookedAppointmentAction(appointment).then((response) => {
      if (response.state !== 'error') {
        setAppointmentData(response.data)
      }
    })
  }, [appointment])

  useEffect(() => {
    const [addOndata, otherData] = filterAndSort(
      data,
      'additionalTherapyDetail',
    )
    setOtherData(otherData)
    const transformedValues = transformIn(addOndata, appointmentData, visitType)
    setValues(transformedValues)
  }, [data, visitType, appointmentData])

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

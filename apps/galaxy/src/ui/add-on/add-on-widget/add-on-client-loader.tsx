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
  const [values, setValues] = useState<AddOnWidgetSchemaType>({})
  const [otherData, setOtherData] = useState<QuickNoteSectionItem[]>([])
  useEffect(() => {
    getBookedAppointmentAction(appointment).then((response) => {
      let responseData: Appointment[] = []
      if (response.state === 'error') {
        responseData = []
      } else {
        responseData = response?.data
      }
      const [addOndata, otherData] = filterAndSort(
        data,
        'additionalTherapyDetail',
      )
      const values = transformIn(addOndata, responseData, visitType)
      setOtherData(otherData)
      setValues(values)
    })
  }, [appointment, data, visitType])

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

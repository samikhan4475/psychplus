'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { filterAndSort } from '@/utils'
import { transformIn } from './data'
import { HpiWidget } from './hpi-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  isHpiHeader?: boolean
  data?: QuickNoteSectionItem[]
  readonly appointment: Appointment
  readonly appointmentId: string
}

const HpiWidgetClientLoader = ({
  patientId,
  isHpiHeader,
  data = [],
  appointment,
  appointmentId
}: HpiWidgetLoaderProps) => {
  const [hpiData, restData] = filterAndSort(data ?? [], 'hpiOther')
  const initialValue = transformIn(hpiData)

  return (
    <HpiWidget
      patientId={patientId}
      initialValue={initialValue}
      isHpiHeader={isHpiHeader}
      otherData={restData}
      appointment={appointment}
      appointmentId={appointmentId}
    />
  )
}

export { HpiWidgetClientLoader }

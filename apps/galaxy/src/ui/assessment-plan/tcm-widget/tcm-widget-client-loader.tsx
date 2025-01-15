'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { TcmWidget } from './tcm-widget'

interface TcmWidgetLoaderProps {
  patientId: string
  isTcmTab?: boolean
  data?: QuickNoteSectionItem[]
  appointment: Appointment
}

const TcmWidgetClientLoader = ({
  patientId,
  isTcmTab = false,
  data,
  appointment,
}: TcmWidgetLoaderProps) => {
  return (
    <TcmWidget
      appointmentData={appointment}
      patientId={patientId}
      tcmData={data ?? []}
      isTcmTab={isTcmTab}
    />
  )
}

export { TcmWidgetClientLoader }

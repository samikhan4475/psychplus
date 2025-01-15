'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { MseWidget } from './mse-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  appointment?: Appointment
  isMseTab?: boolean
  data?: QuickNoteSectionItem[]
}

const MseWidgetClientLoader = ({
  patientId,
  appointment,
  isMseTab = false,
  data,
}: HpiWidgetLoaderProps) => {
  const initialValue = transformIn(data ?? [])

  return (
    <MseWidget
      patientId={patientId}
      initialValue={initialValue}
      isMseTab={isMseTab}
      appointment={appointment}
    />
  )
}

export { MseWidgetClientLoader }

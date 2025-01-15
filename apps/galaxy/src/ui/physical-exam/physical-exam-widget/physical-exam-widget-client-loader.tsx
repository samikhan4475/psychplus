'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { PhysicalExamWidget } from './physical-exam-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  appointment?: Appointment
  isPhysicalExamTab?: boolean
  data?: QuickNoteSectionItem[]
}

const PhysicalExamWidgetClientLoader = ({
  patientId,
  appointment,
  isPhysicalExamTab = false,
  data,
}: HpiWidgetLoaderProps) => {
  const initialValue = transformIn(data ?? [])

  return (
    <PhysicalExamWidget
      patientId={patientId}
      initialValue={initialValue}
      isPhysicalExamTab={isPhysicalExamTab}
      appointment={appointment}
    />
  )
}

export { PhysicalExamWidgetClientLoader }

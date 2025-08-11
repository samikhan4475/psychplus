'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { useStore } from '@/ui/quicknotes/store'
import { transformIn } from './data'
import { FitForDutyPsychEvalWidget } from './widget'

interface Props {
  patientId: string
  isHeader?: boolean
  data?: QuickNoteSectionItem[]
  readonly appointment: Appointment
  readonly appointmentId: string
}

const FitForDutyPsychEvalClientLoader = ({
  patientId,
  isHeader,
  data = [],
}: Props) => {
  const patientVitals = useStore((state) => state.patientVitals)
  const initialValue = transformIn({ data, patientVitals })
  return (
    <FitForDutyPsychEvalWidget
      patientId={patientId}
      initialValue={initialValue}
      isHeader={isHeader}
    />
  )
}

export { FitForDutyPsychEvalClientLoader }

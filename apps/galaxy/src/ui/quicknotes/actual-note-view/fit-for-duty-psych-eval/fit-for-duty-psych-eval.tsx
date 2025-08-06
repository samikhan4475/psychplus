'use client'

import { Appointment, PatientProfile, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/fit-for-duty-psych-eval/widget/data'
import { Details } from './details'

interface Props {
  data?: QuickNoteSectionItem[]
  appointment?: Appointment
  patientId: string
  patient?: PatientProfile
}

const FitForDutyActualNoteView = ({
  data,
  patient,
  appointment,
  patientId,
}: Props) => {
  return (
    <Details
      data={transformIn(data ?? [])}
      appointment={appointment}
      patientId={patientId}
      patient={patient}
    />
  )
}

export { FitForDutyActualNoteView }

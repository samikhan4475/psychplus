'use client'

import { Appointment, PatientProfile, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/fit-for-duty-psych-eval/widget/data'
import { SchemaType as FitForDutySchemaType } from '@/ui/fit-for-duty-psych-eval/widget/schema'
import { Details } from './details'
import { NarrativeSection } from './narrative-section'
import { templateSections } from './templates'

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
    <Details<FitForDutySchemaType>
      data={transformIn({ data: data ?? [], isActualNoteView: true })}
      appointment={appointment}
      patientId={patientId}
      patient={patient}
      renderNarrativeSections={({ data, patient, appointment }) =>
        templateSections.map((section) => (
          <NarrativeSection
            key={section.key}
            heading={section.heading}
            template={section.template}
            patient={patient as PatientProfile}
            appointment={appointment}
            data={data}
          />
        ))
      }
    />
  )
}

export { FitForDutyActualNoteView }

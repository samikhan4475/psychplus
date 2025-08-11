'use client'

import { Appointment, Gender, PatientProfile } from '@/types'
import { SchemaType as FitForDutySchemaType } from '@/ui/fit-for-duty-psych-eval/widget/schema'
import { getPatientAge, getPatientFullName } from '@/utils'
import { GenericTemplateRenderer } from './generic-template-renderer'

interface Props<T> {
  data?: Partial<T>
  appointment?: Appointment
  patient: PatientProfile
  heading: string
  template: string
}

const NarrativeSection = ({
  data,
  patient,
  appointment,
  heading,
  template,
}: Props<FitForDutySchemaType>) => {
  return (
    <GenericTemplateRenderer
      heading={heading}
      template={template}
      values={{
        ...data,
        patientName: patient ? getPatientFullName(patient?.legalName) : '',
        providerName: appointment?.providerFullName,
        appointmentDate: appointment?.startDate,
        gender: patient && (patient?.gender as Gender),
        patientAge: patient ? `${getPatientAge(patient?.birthdate)}` : '',
        didNotExplainWhy:
          data?.providerGaveRecommendationsToSubject === 'didNot'
            ? ' I chose not to do so because I was not sure what the conclusions would be at that time.'
            : '',
        didEnlistedIn:
          data?.hasMilitaryExperience === 'does'
            ? 'Patient was enlisted in'
            : '',
      }}
    />
  )
}

export { NarrativeSection }

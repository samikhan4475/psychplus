'use client'

import { Appointment, Gender, PatientProfile } from '@/types'
import { getFormattedValue } from '@/ui/fit-for-duty-psych-eval/widget/utils'
import { SchemaType as PreEmploymentSchemaType } from '@/ui/pre-employment-psych-eval/widget/schema'
import { getPatientAge, getPatientFullName } from '@/utils'
import { GenericTemplateRenderer } from '../fit-for-duty-psych-eval/generic-template-renderer'

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
}: Props<PreEmploymentSchemaType>) => {
  const livingArrangement =
    getFormattedValue(
      data?.livingArrangement ?? '',
      data?.livingArrangementOtherDetails,
      'other',
    ) ?? ''

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
        visitState: appointment?.stateCode,
        livingArrangement,
      }}
    />
  )
}

export { NarrativeSection }

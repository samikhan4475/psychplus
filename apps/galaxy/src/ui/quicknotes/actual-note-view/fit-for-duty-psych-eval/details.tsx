import { Appointment, PatientProfile } from '@/types'
import { SchemaType as FitForDutySchemaType } from '@/ui/fit-for-duty-psych-eval/widget/schema'
import { getFormattedValue } from '@/ui/fit-for-duty-psych-eval/widget/utils'
import { NarrativeSection } from './narrative-section'
import { ReferringOrganizationDetails } from './referring-organization'
import { templateSections } from './templates'

interface Props<T> {
  data: T
  appointment?: Appointment
  patientId: string
  patient?: PatientProfile
}

const Details = ({
  data,
  appointment,
  patient,
}: Props<FitForDutySchemaType>) => {
  const referringOrganization =
    getFormattedValue(
      data?.referringOrganization,
      data?.referringOrganizationOtherDetails,
      'other',
      { upperCaseFirst: true },
    ) ?? ''

  const intervieweeRole =
    getFormattedValue(
      data?.intervieweeRole,
      data?.intervieweeRoleOtherDetails,
      'other',
      { upperCaseFirst: true },
    ) ?? ''

  return (
    <>
      <ReferringOrganizationDetails
        data={{ ...data, referringOrganization, intervieweeRole }}
      />
      {templateSections.map((el) => {
        return (
          <NarrativeSection
            key={el.key}
            heading={el.heading}
            template={el.template}
            patient={patient as PatientProfile}
            appointment={appointment}
            data={{ ...data, referringOrganization, intervieweeRole }}
          />
        )
      })}
    </>
  )
}

export { Details }

import { Appointment, PatientProfile } from '@/types'
import { ReferralFields } from '@/ui/fit-for-duty-psych-eval/widget/types'
import {
  formatValue,
  getFormattedValue,
} from '@/ui/fit-for-duty-psych-eval/widget/utils'
import { ReferringOrganizationDetails } from './referring-organization'

interface Props<T extends ReferralFields> {
  data: T
  appointment?: Appointment
  patientId: string
  patient?: PatientProfile
  renderNarrativeSections: (params: {
    data: T
    patient?: PatientProfile
    appointment?: Appointment
  }) => React.ReactNode
}

const Details = <T extends ReferralFields>({
  data,
  appointment,
  patient,
  renderNarrativeSections,
}: Props<T>) => {
  const referringOrganization =
    getFormattedValue(
      formatValue(data?.referringOrganization, { upperCaseFirst: true }),
      data?.referringOrganizationOtherDetails,
      'other',
    ) ?? ''

  const intervieweeRole =
    getFormattedValue(
      formatValue(data?.intervieweeRole, { upperCaseFirst: true }),
      data?.intervieweeRoleOtherDetails,
      'other',
    ) ?? ''

  const formattedData = {
    ...data,
    referringOrganization,
    intervieweeRole,
  }

  return (
    <>
      <ReferringOrganizationDetails data={formattedData} />
      {renderNarrativeSections({ data: formattedData, patient, appointment })}
    </>
  )
}

export { Details }

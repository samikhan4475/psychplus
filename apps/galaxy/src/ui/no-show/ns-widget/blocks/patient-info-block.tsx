import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { Appointment, PatientProfile } from '@/types'
import { LabelAndValue } from '@/ui/patient-banner/label-and-value'
import { BlockContainer } from '@/ui/quicknotes/actual-note-view/shared'
import { getTimeZoneAbbreviation } from '@/ui/schedule/utils'
import { convertToTimezone } from '@/ui/visit/utils'
import {
  getCodesetDisplayName,
  getPatientFullName,
  getSlashedPaddedDateString,
} from '@/utils'

interface PatientInfoBlockParams {
  appointment: Appointment | undefined
  patient: PatientProfile | undefined
}
export const PatientInfoBlock = ({
  appointment,
  patient,
}: PatientInfoBlockParams) => {
  const options = useCodesetOptions(CODESETS.ProviderType)
  const providerTypeLabel =
    options?.find((opt) => opt?.value === appointment?.providerType)?.label ??
    'N/A'

  const sequenceCodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCodes = useCodesetCodes(CODESETS.VisitMedium)
  const medium = getCodesetDisplayName(appointment?.type ?? '', mediumCodes)
  const sequence = getCodesetDisplayName(
    appointment?.visitSequence || '',
    sequenceCodes,
  )
  const { date, time } = convertToTimezone(
    appointment?.startDate,
    appointment?.locationTimezoneId,
  )
  const timeZoneCodeSets = useCodesetCodes(CODESETS.TimeZoneId).filter(
    (code) => code.groupingCode === 'US',
  )
  const locationTimeZoneAbbreviation = getTimeZoneAbbreviation(
    appointment ? appointment.locationTimezoneId : '',
    timeZoneCodeSets,
  )

  return (
    <BlockContainer heading="No Show">
      <LabelAndValue label="Title:" value="No Show" />
      <LabelAndValue label="Visit Type:" value={`${appointment?.visitType}`} />
      <LabelAndValue label="Visit Sequence:" value={sequence} />
      <LabelAndValue label="Visit Medium:" value={medium} />
      <LabelAndValue label="Provider Type:" value={providerTypeLabel} />
      <LabelAndValue label="Provider:" value={appointment?.providerName} />
      <LabelAndValue label="Location:" value={appointment?.locationName} />
      <LabelAndValue label="Service:" value={appointment?.service} />
      <LabelAndValue
        label="Date/Time:"
        value={`${getSlashedPaddedDateString(
          date,
        )} ${time} (${locationTimeZoneAbbreviation})`}
      />
      <LabelAndValue
        label="Patient:"
        value={patient?.legalName ? getPatientFullName(patient.legalName) : ''}
      />

      <LabelAndValue
        label="DOB:"
        value={getSlashedPaddedDateString(patient?.birthdate, true)}
      />
      <LabelAndValue
        label="Cosigner:"
        value={appointment?.cosignerName?.firstName}
      />
      <LabelAndValue label="Visit #:" value={appointment?.encounterNumber} />
    </BlockContainer>
  )
}

'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { Appointment, PatientProfile } from '@/types'
import { getTimeZoneAbbreviation } from '@/ui/schedule/utils'
import { convertToTimezone } from '@/ui/visit/utils'
import { getPatientFullName, getSlashedPaddedDateString } from '@/utils'
import { BlockContainer, LabelAndValue } from './shared'

interface Props {
  appointment: Appointment
  patient: PatientProfile
  cosignerLabel?: string
}

const PsychiatricEvaluation = ({
  appointment,
  patient,
  cosignerLabel,
}: Props) => {
  const ServicesOffered = useCodesetCodes(CODESETS.ServicesOffered)
  const service = ServicesOffered.find(
    (service) => service.value === appointment.service,
  )?.display

  const { date, time } = convertToTimezone(
    appointment.startDate,
    appointment.locationTimezoneId,
  )
  const options = useCodesetOptions(CODESETS.ProviderType)
  const providerTypeLabel =
    options?.find((opt) => opt?.value === appointment.providerType)?.label ??
    'N/A'
  const timeZoneCodeSets = useCodesetCodes(CODESETS.TimeZoneId).filter(
    (code) => code.groupingCode === 'US',
  )
  const locationTimeZoneAbbreviation = getTimeZoneAbbreviation(
    appointment.locationTimezoneId,
    timeZoneCodeSets,
  )

  return (
    <BlockContainer heading={appointment.visitNoteTitle ?? ''}>
      <LabelAndValue label="Title:" value={appointment.visitNoteTitle} />
      <LabelAndValue
        label="Visit Type:"
        value={`${appointment?.visitType} | ${appointment?.visitSequence} | ${appointment?.type}`}
      />
      <LabelAndValue label="Provider Type:" value={providerTypeLabel} />
      <LabelAndValue label="Provider:" value={appointment.providerName} />
      <LabelAndValue label="Cosigner:" value={cosignerLabel ?? ''} />
      <LabelAndValue
        label="Location/Service:"
        value={`${appointment.locationName} | ${service}`}
      />
      <LabelAndValue
        label="Date/Time:"
        value={`${getSlashedPaddedDateString(
          date,
        )} ${time} (${locationTimeZoneAbbreviation})`}
      />
      <LabelAndValue
        label="Duration:"
        value={appointment?.duration ? `${appointment.duration} mins` : 'N/A'}
      />

      <LabelAndValue
        label="Patient Name:"
        value={getPatientFullName(patient?.legalName)}
      />
      <LabelAndValue
        label="DOB:"
        value={getSlashedPaddedDateString(patient.birthdate, true)}
      />
      <LabelAndValue label="Visit ID:" value={appointment.encounterNumber} />
    </BlockContainer>
  )
}

export { PsychiatricEvaluation }

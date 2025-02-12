'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes, useCodesetOptions } from '@/hooks'
import { Appointment, PatientProfile } from '@/types'
import { convertToTimezone } from '@/ui/visit/utils'
import {
  getPatientFullName,
  getSlashedDateString,
  getSlashedPaddedDateString,
} from '@/utils'
import { useStore } from '../store'
import { BlockContainer, LabelAndValue } from './shared'

interface Props {
  appointment: Appointment
  patient: PatientProfile
}

const PsychiatricEvaluation = ({ appointment, patient }: Props) => {
  const { cosignerLabel } = useStore((state) => ({
    cosignerLabel: state.cosignerLabel,
  }))

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

  return (
    <BlockContainer heading={appointment.visitNoteTitle ?? ''}>
      <LabelAndValue label="Title:" value={appointment.visitNoteTitle} />
      <LabelAndValue label="Visit Type:" value={appointment?.visitType} />
      <LabelAndValue
        label="Visit Sequence:"
        value={appointment.visitSequence}
      />
      <LabelAndValue label="Provider Type:" value={providerTypeLabel} />
      <LabelAndValue label="Visit Medium:" value={appointment.type} />
      <LabelAndValue label="Provider:" value={appointment.providerName} />
      <LabelAndValue label="Cosigner:" value={cosignerLabel ?? ''} />
      <LabelAndValue label="Location:" value={appointment.locationName} />
      <LabelAndValue label="Service:" value={service} />
      <LabelAndValue label="Date:" value={getSlashedPaddedDateString(date)} />
      <LabelAndValue label="Time:" value={time} />
      <LabelAndValue label="Duration:" value={`${appointment.duration} mins`} />
      <LabelAndValue label="Visit #:" value={appointment.encounterNumber} />
      <LabelAndValue
        label="Patient:"
        value={getPatientFullName(patient?.legalName)}
      />
      <LabelAndValue
        label="DOB:"
        value={getSlashedPaddedDateString(patient.birthdate as string, true)}
      />
      <LabelAndValue label="MRN:" value={patient.medicalRecordNumber} />
    </BlockContainer>
  )
}

export { PsychiatricEvaluation }

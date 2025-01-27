'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment, PatientProfile } from '@/types'
import { getPatientFullName, getSlashedDateString, getTimeLabel } from '@/utils'
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

  return (
    <BlockContainer heading={appointment.visitNoteTitle ?? ''}>
      <LabelAndValue label="Title:" value={appointment.visitNoteTitle} />
      <LabelAndValue label="Visit Type:" value={appointment?.visitType} />
      <LabelAndValue
        label="Visit Sequence:"
        value={appointment.visitSequence}
      />
      <LabelAndValue label="Visit Medium:" value={appointment.type} />
      <LabelAndValue label="Provider Type:" value={appointment.providerType} />
      <LabelAndValue label="Provider:" value={appointment.providerName} />
      <LabelAndValue label="Location:" value={appointment.locationName} />
      <LabelAndValue label="Service:" value={service} />
      <LabelAndValue
        label="Date:"
        value={getSlashedDateString(appointment.startDate ?? '')}
      />
      <LabelAndValue
        label="Time:"
        value={getTimeLabel(appointment.startDate ?? '', false)}
      />
      <LabelAndValue label="Duration:" value={`${appointment.duration} min`} />
      <LabelAndValue
        label="Patient:"
        value={getPatientFullName(patient?.legalName)}
      />
      <LabelAndValue
        label="DOB:"
        value={
          patient.dateOfBirth ? getSlashedDateString(patient.dateOfBirth) : ''
        }
      />
      <LabelAndValue label="Cosigner:" value={cosignerLabel ?? ''} />
      <LabelAndValue label="Visit #:" value={appointment.encounterNumber} />
    </BlockContainer>
  )
}

export { PsychiatricEvaluation }

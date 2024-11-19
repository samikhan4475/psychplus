'use client'

import { Appointment, PatientProfile } from '@/types'
import { getPatientFullName, getSlashedDateString, getTimeLabel } from '@/utils'
import { BlockContainer, LabelAndValue } from './shared'

interface Props {
  appointment: Appointment
  patient: PatientProfile
}

const PsychiatricEvaluation = ({ appointment, patient }: Props) => {
  return (
    <BlockContainer heading={appointment.visitNoteTitle ?? ''}>
      <LabelAndValue label="Title:" value={appointment.visitNoteTitle} />
      <LabelAndValue label="Visit Type:" value={appointment?.visitType} />
      <LabelAndValue
        label="Visit Sequence:"
        value={appointment.visitSequence}
      />
      <LabelAndValue label="Visit Medium:" value={appointment.visitMedium} />
      <LabelAndValue label="Provider Type:" value={appointment.providerType} />
      <LabelAndValue label="Provider:" value={appointment.providerName} />
      <LabelAndValue label="Location:" value={appointment.locationName} />
      <LabelAndValue label="Service:" value={appointment.service} />
      <LabelAndValue
        label="Date:"
        value={getSlashedDateString(appointment.startDate ?? '')}
      />
      <LabelAndValue
        label="Time:"
        value={getTimeLabel(appointment.startDate ?? '')}
      />
      <LabelAndValue label="Duration:" value={`${appointment.duration} min`} />
      <LabelAndValue
        label="Patient:"
        value={getPatientFullName(patient.legalName)}
      />
      <LabelAndValue
        label="DOB:"
        value={
          patient.dateOfBirth ? getSlashedDateString(patient.dateOfBirth) : ''
        }
      />
      <LabelAndValue label="Cosigner:" value="John Smith, MD" />
      <LabelAndValue label="Visit #:" value={appointment.encounterNumber} />
    </BlockContainer>
  )
}

export { PsychiatricEvaluation }

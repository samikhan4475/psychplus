'use client'

import {
  BlockContainer,
  LabelAndValue,
} from '@/ui/quicknotes/actual-note-view/shared'
import { getPatientFullName, getSlashedDateString, getTimeLabel } from '@/utils'
import { useStore } from '../store'

const SecondaryNoteResults = () => {
  const { noteDetail, appointment, cosigner, patient } = useStore((state) => ({
    noteDetail: state.noteDetail,
    appointment: state.appointment,
    cosigner: state.cosigner,
    patient: state.patient,
  }))

  let cosignerName, patientName
  if (cosigner && patient) {
    cosignerName = getPatientFullName(cosigner?.legalName)
    patientName = getPatientFullName(patient?.legalName)
  }

  return (
    <BlockContainer heading="Results">
      <LabelAndValue
        label="Note Title:"
        value={noteDetail?.[0].noteTitleCode ?? ''}
      />
      <LabelAndValue
        label="Note Type:"
        value={noteDetail?.[0].noteTypeCode ?? ''}
      />
      <LabelAndValue label="Provider:" value={appointment?.providerName} />
      <LabelAndValue
        label="Date:"
        value={
          noteDetail?.[0]?.signedDate
            ? getSlashedDateString(noteDetail?.[0]?.signedDate)
            : ''
        }
      />
      <LabelAndValue
        label="Time:"
        value={
          noteDetail?.[0]?.signedDate
            ? getTimeLabel(noteDetail?.[0]?.signedDate)
            : ''
        }
      />

      <LabelAndValue label="Cosigner:" value={cosignerName} />
      <LabelAndValue label="Visit Type:" value={appointment?.visitType} />
      <LabelAndValue label="Location:" value={appointment?.locationName} />
      <LabelAndValue label="Service:" value={appointment?.service} />
      <LabelAndValue label="Patient:" value={patientName} />
      <LabelAndValue label="DOB:" value={patient?.birthdate} />
      <LabelAndValue label="Visit #:" value={appointment?.encounterNumber} />
    </BlockContainer>
  )
}

export { SecondaryNoteResults }

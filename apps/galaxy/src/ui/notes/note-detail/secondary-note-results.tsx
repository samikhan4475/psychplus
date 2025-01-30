'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import {
  BlockContainer,
  LabelAndValue,
} from '@/ui/quicknotes/actual-note-view/shared'
import { convertToTimezone } from '@/ui/visit/utils'
import { getPatientFullName, getSlashedDateString } from '@/utils'
import { useStore } from '../store'

const SecondaryNoteResults = () => {
  const { noteDetail, appointment, patient, selectedRow } = useStore(
    (state) => ({
      noteDetail: state.noteDetail,
      appointment: state.appointment,
      patient: state.patient,
      selectedRow: state.selectedRow,
    }),
  )

  const { date, time } = convertToTimezone(
    noteDetail?.[0]?.signedDate,
    appointment?.locationTimezoneId,
  )

  let patientName
  if (patient) {
    patientName = getPatientFullName(patient?.legalName)
  }

  const selectedNoteTitle = useCodesetCodes(CODESETS.NoteTitle).find(
    (item) => item.value === noteDetail?.[0].noteTitleCode,
  )?.display

  const selectedNoteType = useCodesetCodes(CODESETS.NoteType).find(
    (item) => item.value === noteDetail?.[0].noteTypeCode,
  )?.display

  return (
    <BlockContainer heading="Results">
      <LabelAndValue
        label="Note Title:"
        value={selectedNoteTitle ?? noteDetail?.[0].noteTitleCode ?? ''}
      />
      <LabelAndValue
        label="Note Type:"
        value={selectedNoteType ?? noteDetail?.[0].noteTypeCode ?? ''}
      />
      <LabelAndValue label="Provider:" value={selectedRow?.signedByUserName} />
      <LabelAndValue
        label="Date:"
        value={date ? getSlashedDateString(date) : ''}
      />
      <LabelAndValue label="Time:" value={time ? time : ''} />

      <LabelAndValue
        label="Cosigner:"
        value={selectedRow?.cosignedByUserName}
      />
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

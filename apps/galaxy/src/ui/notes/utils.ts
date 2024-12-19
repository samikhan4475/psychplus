import { GroupedBySectionName, NoteDetail, PatientNotes } from './types'

const getAuthorName = (note: PatientNotes) => {
  const { createdBy, createdByFullName } = note.metadata || {}
  const {
    signedByUserId,
    signedByUserName,
    coSignedDate,
    signedDate,
    cosignedByUserName,
  } = note

  const cssNameText = createdByFullName
    ? `${createdByFullName} (as the scribe)`
    : ''

  const coSignedText = coSignedDate ? `, ${cosignedByUserName}` : ''
  const signedName = signedDate ? `, ${signedByUserName}` : ''
  const pendingText = signedDate ? '' : '"Pending"'

  if (createdBy === signedByUserId) {
    return coSignedDate
      ? `${signedByUserName}${coSignedText}`
      : signedByUserName
  }

  if (signedDate) {
    return coSignedDate
      ? `${cssNameText}${signedName}${coSignedText}`
      : `${cssNameText}${signedName}`
  }

  return coSignedDate
    ? `${cssNameText}${pendingText}${coSignedText}`
    : `${cssNameText}, ${pendingText}`
}

const groupBySectionName = (
  encounterSignedNote: NoteDetail,
): GroupedBySectionName => {
  const encounterSignedNoteDetail =
    encounterSignedNote[0]?.encounterSignedNoteDetails

  const result = encounterSignedNoteDetail?.reduce<GroupedBySectionName>(
    (acc, detail) => {
      let { sectionName } = detail

      if (!acc[sectionName]) {
        acc[sectionName] = []
      }
      acc[sectionName].push(detail)
      return acc
    },
    {},
  )
  return result || {}
}

export { getAuthorName, groupBySectionName }

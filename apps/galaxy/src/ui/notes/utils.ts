import { GroupedBySectionName, NoteDetail, PatientNotes } from './types'

const getAuthorName = (note: PatientNotes) => {
  const { createdBy, createdByFullName } = note.metadata || {}
  const {
    signedByUserId,
    signedByUserName,
    cosignedDate,
    signedDate,
    cosignedByUserName,
  } = note

  const cssNameText = createdByFullName
    ? `${createdByFullName} (as the scribe)`
    : ''

  const coSignedText = cosignedDate ? `, ${cosignedByUserName || ''}` : ''
  const signedName = signedDate ? `, ${signedByUserName || ''}` : ''
  const pendingText = signedDate ? '' : '"Pending"'

  if (createdBy === signedByUserId) {
    return cosignedDate
      ? `${signedByUserName || ''}${coSignedText}`
      : signedByUserName || ''
  }

  if (signedDate) {
    return cosignedDate
      ? `${cssNameText}${signedName}${coSignedText}`
      : `${cssNameText}${signedName}`
  }

  return cosignedDate
    ? `${cssNameText}${pendingText}${coSignedText}`
    : `${cssNameText}, ${pendingText}`
}

function removeEmptyValues<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) =>
        !(Array.isArray(value) && value.length === 1 && value[0] === '') &&
        value !== '',
    ),
  )
}
const groupBySectionName = (
  encounterSignedNote: NoteDetail,
): GroupedBySectionName => {
  const encounterSignedNoteDetail =
    encounterSignedNote[0]?.encounterSignedNoteDetails

  const result = encounterSignedNoteDetail?.reduce<GroupedBySectionName>(
    (acc, detail) => {
      const { sectionName } = detail

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

export { getAuthorName, groupBySectionName, removeEmptyValues }

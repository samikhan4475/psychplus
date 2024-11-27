import { PatientNotes } from './types'

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

export { getAuthorName }

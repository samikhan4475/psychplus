'use server'

import { type ActionResult } from '@psychplus-v2/api'
import { deleteJournalAttachment } from '../api/delete-attachment'
import { type DeleteAttachmentResponse } from '../types'

const deleteAttachmentAction = async (
  patientId: string,
  journalId: string,
  attachmentId: string,
): Promise<ActionResult<DeleteAttachmentResponse>> => {
  return deleteJournalAttachment(patientId, journalId, attachmentId)
}

export { deleteAttachmentAction } 
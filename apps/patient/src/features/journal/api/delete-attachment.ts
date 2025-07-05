import { API_URL } from '@psychplus-v2/env'
import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { type DeleteAttachmentResponse } from '../types'

export async function deleteJournalAttachment(
  patientId: string,
  journalId: string,
  attachmentId: string,
): Promise<ActionResult<DeleteAttachmentResponse>> {
  const url = `${API_URL}/api/patients/${patientId}/moodjournals/${journalId}/attachments/${attachmentId}`

  const result = await api.DELETE<DeleteAttachmentResponse>(url)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
} 
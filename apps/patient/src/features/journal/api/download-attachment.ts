import { API_URL } from '@psychplus-v2/env'
import * as api from '@psychplus-v2/api/client'
import { type ActionResult } from '@psychplus-v2/api'

export async function downloadJournalAttachment(
  patientId: string,
  journalId: string,
  attachmentId: string,
): Promise<ActionResult<Blob>> {
  const url = `${API_URL}/api/patients/${patientId}/moodjournals/${journalId}/attachments/${attachmentId}/actions/download`

  const result = await api.POST<Blob>(url, {}, { binaryResponse: true })

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
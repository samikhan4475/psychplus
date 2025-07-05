import { API_URL } from '@psychplus-v2/env'
import * as api from '@psychplus-v2/api/client'
import { type ActionResult } from '@psychplus-v2/api'
import { type UploadAttachmentResponse } from '../types'

export async function uploadJournalAttachments(
  patientId: string,
  journalId: string,
  files: File[],
): Promise<ActionResult<UploadAttachmentResponse>> {
  const url = `${API_URL}/api/patients/${patientId}/moodjournals/${journalId}/attachments/actions/upload`
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const result = await api.POST<UploadAttachmentResponse>(url, formData)

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
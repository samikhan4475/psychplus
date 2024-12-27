'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'

interface uploadDocumentActionParams {
  patientId: number
  appointmentId: number
  data: FormData
}

const uploadDocumentAction = async ({
  patientId,
  appointmentId,
  data
}: uploadDocumentActionParams): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const response = await api.POST<QuickNoteSectionItem[]>(api.UPLOAD_QUICK_NOTE_DOCUMENT(patientId, appointmentId), data,
    {
      ignoreHeaders: false
    },
  );
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
  }
}

export { uploadDocumentAction }


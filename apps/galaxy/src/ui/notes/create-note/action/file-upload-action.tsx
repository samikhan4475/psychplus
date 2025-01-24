'use server'

import * as api from '@/api'
import { NoteDocumentResponse } from '../../types'

interface FileUploadProps {
  data: FormData
  patientId: string
  appointmentId: string | null
}

const fileUploadAction = async ({
  data,
  patientId,
  appointmentId,
}: FileUploadProps) => {
  const result = await api.POST<NoteDocumentResponse[]>(
    api.NOTE_UPLOAD_FILE(patientId, appointmentId),
    data,
    {
      ignoreHeaders: false,
    },
  )

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

export { fileUploadAction }

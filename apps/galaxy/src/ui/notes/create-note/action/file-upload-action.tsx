'use server'

import * as api from '@/api'

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
  const result = await api.POST<void>(
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
    data: undefined,
  }
}

export { fileUploadAction }

'use server'

import * as api from '@/api'

type FileFormat = 'Xml' | 'Json' | 'Csv' | 'Xlsx' | 'Pdf' | 'Txt' | 'Image'

interface UploadPreferredPartnerUsersParams {
  ppid: string
  fileFormat: FileFormat
  data: FormData
}

interface UploadPreferredPartnerUsersResponse {
  message: string
  uploadedCount: number
  fileFormat: FileFormat
}

const uploadPreferredPartnerUsersAction = async ({
  ppid,
  fileFormat,
  data,
}: UploadPreferredPartnerUsersParams): Promise<
  api.ActionResult<UploadPreferredPartnerUsersResponse>
> => {
  const response = await api.POST<UploadPreferredPartnerUsersResponse>(
    api.UPLOAD_PREFERRED_PARTNER_USERS(ppid, fileFormat),
    data,
    {
      ignoreHeaders: false,
    },
  )

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

export { uploadPreferredPartnerUsersAction, type FileFormat }

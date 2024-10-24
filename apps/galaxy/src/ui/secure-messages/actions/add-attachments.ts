'use server'

import * as api from '@/api'
import { AttachmentsParams } from '../types'

const addAttachmentsAction = async ({
  messageId,
  fileName,
  fileDescription,
  fileUrl,
  mimeType,
}: AttachmentsParams): Promise<api.ActionResult<undefined>> => {
  const url = new URL(api.ADD_ATTACHMENTS_SECURE_MESSAGE(messageId))
  url.searchParams.append('fileName', fileName)
  url.searchParams.append('fileDescription', fileDescription)
  url.searchParams.append('fileUrl', fileUrl)
  url.searchParams.append('mimeType', mimeType)
  const response = await api.POST(url.toString(), { ignoreHeaders: false })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: undefined,
  }
}

export { addAttachmentsAction }

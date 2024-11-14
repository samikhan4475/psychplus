'use server'

import * as api from '@/api'
import { InitializeAttachmentsParams } from '../types'

const initializeAttachmentsAction = async ({
  messageId,
  fileName,
  mimeType,
  fileDescription,
}: InitializeAttachmentsParams): Promise<api.ActionResult<{ id: string }>> => {
  const url = new URL(api.INITIALIZE_ATTACHMENT_SECURE_MESSAGE(messageId))
  url.searchParams.append('fileName', fileName)
  url.searchParams.append('mimeType', mimeType)
  url.searchParams.append('fileDescription', fileDescription)
  const response = await api.POST<{ id: string }>(url.toString(), {
    ignoreHeaders: false,
  })

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

export { initializeAttachmentsAction }

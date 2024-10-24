'use server'

import * as api from '@/api'
import { Attachment } from '../types'

const getAttachmentsAction = async ({
  messageId,
  attachmentId,
}: {
  messageId: string
  attachmentId: string
}): Promise<api.ActionResult<undefined>> => {
  const response = await api.POST(
    api.DOWNLOAD_ATTACHMENTS_FILE_SECURE_MESSAGE(messageId, attachmentId),
    {}
  )
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

export { getAttachmentsAction }

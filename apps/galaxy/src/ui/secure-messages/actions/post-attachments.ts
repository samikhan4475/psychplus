'use server'

import * as api from '@/api'
import { SecureMessagesAttachmentsParams } from '../types'

const postAttachmentsAction = async ({
  messageId,
  attachmentId,
  data,
}: SecureMessagesAttachmentsParams): Promise<api.ActionResult<undefined>> => {
  const response = await api.POST(
    api.ATTACHMENTS_SECURE_MESSAGE(messageId, attachmentId),
    data,
    { ignoreHeaders: false },
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

export { postAttachmentsAction }

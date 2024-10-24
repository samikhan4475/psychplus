'use server'

import * as api from '@/api'

const deleteAttachmentsAction = async ({
  messageId,
  attachmentId,
}: {
  messageId: string
  attachmentId: string
}): Promise<api.ActionResult<undefined>> => {
  const response = await api.DELETE(
    api.DELETE_ATTACHMENTS_SECURE_MESSAGE(messageId, attachmentId),
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

export { deleteAttachmentsAction }

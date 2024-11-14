'use server'

import * as api from '@/api'
import { Attachment, UploadAttachmentsParams } from '../types'

const uploadAttachmentAction = async ({
  messageId,
  attachmentId,
  formData,
}: UploadAttachmentsParams): Promise<api.ActionResult<Attachment>> => {
  const url = new URL(
    api.UPLOAD_ATTACHMENT_SECURE_MESSAGE(messageId, attachmentId),
  )
  const response = await api.POST<Attachment>(url.toString(), formData, {
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

export { uploadAttachmentAction }

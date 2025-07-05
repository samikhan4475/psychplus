'use client'

import * as api from '@/api/api.client'
import { GET_RECIPIENT_SECURE_MESSAGE } from '@/api/endpoints'
import { EmailRecipients, GetEmailRecipientPayload } from '../types'

const getAllRecipientSuggestionsAction = async (
  messageId: string,
  data: GetEmailRecipientPayload,
): Promise<api.ActionResult<EmailRecipients[]>> => {
  const response = await api.POST<EmailRecipients[]>(
    GET_RECIPIENT_SECURE_MESSAGE(messageId),
    data,
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

export { getAllRecipientSuggestionsAction }

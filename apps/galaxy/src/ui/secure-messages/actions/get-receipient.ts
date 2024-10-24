'use server'

import * as api from '@/api'
import { EmailRecipient, EmailRecipients } from '../types'

const getAllRecipientSuggestionsAction = async (
  messageId: string,
  data: EmailRecipient,
): Promise<api.ActionResult<EmailRecipients[]>> => {
  const response = await api.POST<EmailRecipients[]>(
    api.GET_RECIPIENT_SECURE_MESSAGE(messageId),
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

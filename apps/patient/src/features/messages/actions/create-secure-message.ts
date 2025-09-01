'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { ChatResponseTypes } from '../types'

// Define the type for the payload object
interface SecureMessagePayload {
  text: string
  messageStatus: string
  MessageType: string
  IsForTreatmentTeam: boolean
  GroupId?: string | number
}

const createSecureMessage = async (
  data: SecureMessagePayload,
): Promise<ActionResult<ChatResponseTypes>> => {
  const url = new URL(`${API_URL}/api/users/self/securemessaging/messages`)

  const result = await api.POST<ChatResponseTypes>(url.toString(), data)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { createSecureMessage }

'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { ChatResponseTypes } from '../types'

const getMessagesAction = async ({
  messageId,
}: {
  messageId: string | number
}): Promise<ActionResult<ChatResponseTypes[]>> => {
  const url = new URL(
    `${API_URL}/api/users/self/securemessaging/messages/${messageId}/actions/search`,
  )
  url.searchParams.append('offset', '0')
  url.searchParams.append('limit', '0')

  const result = await api.POST<ChatResponseTypes[]>(url.toString(), {
    isConversationalView: true,
  })

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

export { getMessagesAction }

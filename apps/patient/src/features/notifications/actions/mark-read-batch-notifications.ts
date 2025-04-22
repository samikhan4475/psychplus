'use server'

import { type ActionResult } from '@psychplus-v2/api'
import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'

interface MarkAsReadBatchNotificationActionParams {
  notificationIds: string[]
}
const markAsReadBatchNotificationAction = async ({
  notificationIds,
}: MarkAsReadBatchNotificationActionParams): Promise<ActionResult<boolean>> => {
  const url = new URL(
    `${API_URL}/api/users/self/notifications/actions/batchmarkread`,
  )

  const result = await api.POST(String(url), { notificationIds })
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: true,
  }
}

export { markAsReadBatchNotificationAction }

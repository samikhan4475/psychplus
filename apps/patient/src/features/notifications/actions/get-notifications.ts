'use server'

import { type ActionResult } from '@psychplus-v2/api'
import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NotificationItem, NotificationResponse } from '../types'

const getNotificationsAction = async (
  viewAll?: boolean,
): Promise<ActionResult<NotificationResponse>> => {
  const url = new URL(`${API_URL}/api/users/self/notifications?orderBy=createdOn desc&offset=0&includeRead=true`)

  if (!viewAll) url.searchParams.append('limit', '10')
  const result = await api.GET<NotificationItem[]>(String(url))
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: {
      notificationList: result.data,
    },
  }
}

export { getNotificationsAction }

'use server'

import { type ActionResult } from '@psychplus-v2/api'
import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NotificationItem, NotificationResponse } from '../types'
import { NOTIFICATION_PAGINATION_SIZE } from '../ui/constants'

const getNotificationsAction = async (
  page = 1,
): Promise<ActionResult<NotificationResponse>> => {
  const url = new URL(
    `${API_URL}/api/users/self/notifications?orderBy=createdOn desc&includeRead=true`,
  )
  const offset = (page - 1) * NOTIFICATION_PAGINATION_SIZE
  url.searchParams.append('limit', String(NOTIFICATION_PAGINATION_SIZE))
  url.searchParams.append('offset', String(offset))

  const response = await api.GET<NotificationItem[]>(String(url))
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      notificationList: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getNotificationsAction }

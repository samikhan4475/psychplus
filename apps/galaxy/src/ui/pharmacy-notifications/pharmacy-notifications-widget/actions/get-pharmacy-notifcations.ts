'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { NOTIFICATIONS_PAGE_SIZE_LIMIT } from '../constants'
import {
  PharmacyNotifications,
  PharmacyNotificationsPayload,
  PharmacyNotificationsResponseList,
} from '../types'

interface GetPharmacyNotificationsActionProps {
  payload?: PharmacyNotificationsPayload
  page?: number
  sort?: Sort
}

const getPharmacyNotifications = async ({
  payload,
  page = 1,
  sort,
}: GetPharmacyNotificationsActionProps): Promise<
  api.ActionResult<PharmacyNotificationsResponseList>
> => {
  const url = new URL(api.GET_PHARMACY_NOTIFICATIONS_ENDPOINT)
  const offset = (page - 1) * NOTIFICATIONS_PAGE_SIZE_LIMIT

  url.searchParams.append('limit', String(NOTIFICATIONS_PAGE_SIZE_LIMIT))
  url.searchParams.append('offset', String(offset))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<PharmacyNotifications[]>(`${url}`, {
    ...payload,
    communicationDirection: 'Inbound',
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      pharmacyNotifications: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPharmacyNotifications }

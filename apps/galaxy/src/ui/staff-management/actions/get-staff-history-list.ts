'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_HISTORY_ENDPOINT } from '@/api/endpoints'
import type { Staff, StaffHistoryPayload } from '../types'

interface GetStaffListParams {
  payload?: Partial<StaffHistoryPayload>
}

const getStaffHistoryListAction = async (
  staffId: string,
  { payload }: GetStaffListParams,
): Promise<api.ActionResult<Staff[]>> => {
  const response = await api.POST<Staff[]>(
    `${GET_STAFF_HISTORY_ENDPOINT(staffId)}`,
    {
      ...payload,
    },
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
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getStaffHistoryListAction }

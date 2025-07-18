'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_LICENSE } from '@/api/endpoints'
import { License, State } from '../types'

const getStaffActiveStates = async (
  providerStaffId: number,
): Promise<api.ActionResult<State[]>> => {
  const response = await api.POST<License[]>(GET_STAFF_LICENSE, {
    providerStaffId,
    statuses: ['Active'],
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data:
      response.data.map((el) => ({
        stateId: el.stateId,
        stateCode: el.stateCode,
      })) ?? [],
  }
}

export { getStaffActiveStates }

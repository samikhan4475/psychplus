'use server'

import * as api from '@/api'
import { License, State } from '../types'

const getStaffActiveStates = async (
  providerStaffId: number,
): Promise<api.ActionResult<State[]>> => {
  const response = await api.POST<License[]>(api.GET_STAFF_LICENSE, {
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

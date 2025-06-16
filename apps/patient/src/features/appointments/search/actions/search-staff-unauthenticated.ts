'use server'

import * as api from '@psychplus-v2/api'
import type { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Staff } from '@psychplus/staff'
import { SeachStaffAuthenticatedPayload } from '../types'

const defaultPayload = {
  isIncludeAverageRating: true,
  isIncludeBiography: true,
  isIncludeTestProviders: true,
}
const searchStaffUnauthenticatedAction = async (
  payload: SeachStaffAuthenticatedPayload,
): Promise<ActionResult<Staff>> => {
  const result = await api.POST<Staff>(
    `${API_URL}/api/staff/search/unauthenticated`,
    { ...defaultPayload, ...payload },
  )
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

export { searchStaffUnauthenticatedAction }

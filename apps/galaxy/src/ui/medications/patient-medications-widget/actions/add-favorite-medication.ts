'use server'

import * as api from '@/api'
import { getAuthCookies } from '@/utils/auth'
import { FavoriteMedication, FavoriteMedicationPayload } from '../types'

const addFavoriteMedication = async (
  payload: FavoriteMedicationPayload,
): Promise<api.ActionResult<FavoriteMedication>> => {
  const auth = getAuthCookies()
  const response = await api.POST<FavoriteMedication>(
    api.ADD_STAFF_FAVORITES_MEDICATION(Number(auth?.user.staffId)),
    {
      ...payload,
      staffId: Number(auth?.user.staffId),
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
  }
}

export { addFavoriteMedication }

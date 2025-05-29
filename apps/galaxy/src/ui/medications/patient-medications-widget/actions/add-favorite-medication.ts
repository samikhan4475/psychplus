'use server'

import * as api from '@/api'
import { getAuthCookies } from '@/utils/auth'
import { FavoriteMedication } from '../types'

const addFavoriteMedication = async (
  value?: string,
): Promise<api.ActionResult<FavoriteMedication>> => {
  const auth = getAuthCookies()
  const response = await api.POST<FavoriteMedication>(
    api.ADD_STAFF_FAVORITES_MEDICATION(Number(auth?.user.staffId)),
    {
      medicationName: value,
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

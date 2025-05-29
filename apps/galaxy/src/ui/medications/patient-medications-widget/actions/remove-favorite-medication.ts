'use server'

import * as api from '@/api'
import { getAuthCookies } from '@/utils/auth'
import { FavoriteMedication } from '../types'

const removeFavoriteMedication = async (
  id:string,
): Promise<api.ActionResult<FavoriteMedication>> => {
  const auth = getAuthCookies()
  const response = await api.DELETE<FavoriteMedication>(
    api.REMOVE_STAFF_FAVORITES_MEDICATION(Number(auth?.user.staffId),id)
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

export { removeFavoriteMedication }

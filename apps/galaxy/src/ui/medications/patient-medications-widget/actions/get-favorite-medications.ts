'use server'

import * as api from '@/api'
import { getAuthCookies } from '@/utils/auth'
import { FavoriteMedication } from '../types'

const getFavoriteMedications = async (
  value?: string,
): Promise<api.ActionResult<FavoriteMedication[]>> => {
  const auth = getAuthCookies()
  const response = await api.POST<FavoriteMedication[]>(
    api.STAFF_FAVORITES_MEDICATION(Number(auth?.user.staffId)),
    { recordStatuses: ['Active'], partialMedicationName: value },
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

export { getFavoriteMedications }

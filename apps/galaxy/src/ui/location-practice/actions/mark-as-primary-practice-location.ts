'use server'

import * as api from '@/api'
import { LocationPractice } from '@/types'

const maskAsPrimaryPracticeLocationAction = async (
  locationId: string,
  practiceId: string,
): Promise<api.ActionResult<LocationPractice>> => {
  const response = await api.PUT<LocationPractice>(
    api.MARK_AS_PRIMARY_PRACTICE_LOCATION_ENDPOINT(locationId, practiceId),
    {},
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { maskAsPrimaryPracticeLocationAction }

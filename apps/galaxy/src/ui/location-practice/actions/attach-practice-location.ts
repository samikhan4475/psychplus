'use server'

import * as api from '@/api'
import { LocationPractice } from '@/types'
import { AttachPracticeLocationPayload } from '../institutional-practices'

const attachPracticeWithLocationAction = async (
  body: AttachPracticeLocationPayload,
  locationId: string,
  practiceId: string,
): Promise<api.ActionResult<LocationPractice>> => {
  const response = await api.POST<LocationPractice>(
    api.ATTACH_PRACTICE_LOCATION_ENDPOINT(locationId, practiceId),
    body,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { attachPracticeWithLocationAction }

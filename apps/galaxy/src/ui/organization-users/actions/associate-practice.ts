'use server'

import * as api from '@/api'
import { ExternalProvider } from '@/ui/pcp'

const associatePracticeAction = async (
  userId: number,
  practiceId: string
): Promise<api.ActionResult<ExternalProvider[]>> => {
  const result = await api.POST(
    api.ATTACH_PRACTICE_TO_PATIENT_ENDPOINT(
      userId,
      practiceId,
    ),
    {
      patientId: userId,
      practiceId: practiceId
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data as ExternalProvider[],
  }
}

export { associatePracticeAction }

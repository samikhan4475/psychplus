'use server'

import * as api from '@/api'
import { ExternalProvider } from '@/ui/pcp'

const disassociateUserAction = async (
  userId: number,
  practiceId: string
): Promise<api.ActionResult<ExternalProvider[]>> => {
  const result = await api.POST(
    api.DISASSOCIATE_PRACTICE_TO_PATIENT_ENDPOINT(
      userId,
      practiceId,
    ),
    {},
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

export { disassociateUserAction }

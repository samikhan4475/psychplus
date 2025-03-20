'use server'

import * as api from '@/api'

const deleteTestLabsApi = async ({
  appointmentId,
  orderId,
  testId,
}: {
  appointmentId: number | string
  orderId: string
  testId: string
}): Promise<api.ActionResult<void>> => {
  const response = await api.DELETE<void>(
    api.DELETE_LAB_TEST(appointmentId, orderId, testId),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { deleteTestLabsApi }

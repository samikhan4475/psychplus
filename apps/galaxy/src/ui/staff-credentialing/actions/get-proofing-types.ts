'use server'

import * as api from '@/api'

interface GetProofingTypesResponse {
  abandonCount: number
  proofType: string
}

const getProofingTypes = async (
  userId: string,
): Promise<api.ActionResult<GetProofingTypesResponse[]>> => {
  const response = await api.GET<GetProofingTypesResponse[]>(
    api.GET_PROOFING_TYPES(userId),
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

export { getProofingTypes }

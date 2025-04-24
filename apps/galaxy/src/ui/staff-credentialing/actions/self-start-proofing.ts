'use server'

import * as api from '@/api'
import { ProofingType, StartSelfProofingResponse } from '../types'

const selfStartProofing = async (userId: string,loginUserId:string): Promise<api.ActionResult<StartSelfProofingResponse>> => {

  const endpoint = userId === loginUserId 
  ? api.START_SELF_PROOFINGS_ENDPOINT
  : api.START_USERS_PROOFINGS_ENDPOINT(userId); 
  
  const queryParams = new URLSearchParams({
    proofingType: ProofingType.mobile,
  }).toString()

  const endpointWithQuery = `${endpoint}?${queryParams}`
  const response = await api.GET<StartSelfProofingResponse>(endpointWithQuery)
  
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

export { selfStartProofing }
'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Referral } from '../types'

interface GetPatientReferralsPayload {
  resourceStatus?: string[]
}

const getReferralsAction = async (payload: GetPatientReferralsPayload) => {
  const params = new URLSearchParams();
  
  if (payload?.resourceStatus?.length) {
    payload?.resourceStatus?.forEach(status => {
      params.append('resourceStatus', status);
    });
  }
  
  const queryString = params.toString();
  let endpoint = `${API_URL}/api/patients/self/referrals`;
  if (queryString) {
    endpoint += `?${queryString}`;
  }
  const result = await api.GET<Referral[]>(endpoint);

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getReferralsAction }

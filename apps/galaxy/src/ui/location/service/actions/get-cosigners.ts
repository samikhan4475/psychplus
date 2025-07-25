'use server'

import * as api from '@/api'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { Cosigner } from '@/types'

interface RequestParams {
  includeInactive?: boolean
}

const getCosignersAction = async ({
  includeInactive,
}: RequestParams): Promise<api.ActionResult<Cosigner[]>> => {
  
  const url = includeInactive
    ? `${api.GET_STAFF_ENDPOINT}?includeInactive=true`
    : api.GET_STAFF_ENDPOINT

  const response = await api.POST<Cosigner[]>(url, {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
  })

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
export { getCosignersAction }

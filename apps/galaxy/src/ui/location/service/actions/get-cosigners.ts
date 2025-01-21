'use server'

import * as api from '@/api'
import { STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { StaffResource } from '@/types'

const getCosignersAction = async (): Promise<
  api.ActionResult<StaffResource[]>
> => {
  const response = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, {
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

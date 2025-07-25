'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { DEFAULT_STAFF_PAYLOAD_PARAMS, STAFF_ROLE_CODE_PRESCRIBER } from '@/constants'
import { SelectOptionType, StaffResource } from '@/types'
import { transformInStaffOptions } from '../transform'

const getStaffOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<StaffResource[]>(GET_STAFF_ENDPOINT, {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
     ...DEFAULT_STAFF_PAYLOAD_PARAMS
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: transformInStaffOptions(result.data),
  }
}

export { getStaffOptionsAction }

'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { SelectOptionType, StaffResource } from '@/types'
import { transformInStaffOptions } from '../transform'

const getStaffOptionsAction = async (
  roleCodes: string[],
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const result = await api.POST<StaffResource[]>(GET_STAFF_ENDPOINT, {
    roleCodes,
    isResultsForNameList: true,
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

'use server'

import * as api from '@/api'
import { transformInStaffOptions } from '../tranform'
import { SelectOptionType, StaffResource } from '../types'

const getStaffOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, {
    roleCodes: ['1'],
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

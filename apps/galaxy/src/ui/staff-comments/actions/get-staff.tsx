'use server'

import * as api from '@/api'
import { SelectOptionType, StaffResource } from '@/types'
import { transformInStaffOptions } from '../tranform'

const getStaffOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, {
    roleCodes: ['1', '2'],
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

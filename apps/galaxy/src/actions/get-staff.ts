'use server'

import * as api from '@/api'
import { SelectOptionType, StaffResource } from '@/types'

const getStaffOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.GET<StaffResource[]>(api.GET_STAFF)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id.toString(),
    label: data.legalName.firstName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getStaffOptionsAction }

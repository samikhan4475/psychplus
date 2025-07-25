'use client'

import * as api from '@/api/api.client'
import { GET_STAFF_ENDPOINT } from '@/api/endpoints'
import { SelectOptionType } from '@/types'
import type { Staff } from '../types'
import { DEFAULT_STAFF_PAYLOAD_PARAMS } from '@/constants'

const getStaffListOptionsAction = async (
  value: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<Staff[]>(`${GET_STAFF_ENDPOINT}`, {
    name: value,
    ...DEFAULT_STAFF_PAYLOAD_PARAMS,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data
    ? response.data.map((data) => ({
        value: `${data.userId}`,
        label: data.legalName.firstName + ' ' + data.legalName.lastName,
      }))
    : []

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getStaffListOptionsAction }

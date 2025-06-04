'use client'

import * as api from '@/api/api.client'
import { SEARCH_STAFF_ENDPOINT } from '@/api/endpoints'
import { SelectOptionType, StaffResource } from '@/types'
import { getUserFullName } from '@/utils'

const defaultPayload = {
  roleCodes: ['1'],
  isIncludeProviderWithLicenseOnly: true,
}
const getStaffListAction = async (
  providerType: string,
  staffId: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<StaffResource[]>(SEARCH_STAFF_ENDPOINT, {
    ...defaultPayload,
    providerType,
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data
      .filter(({ id }) => +id !== +staffId)
      .map((item) => ({
        label: getUserFullName(item.legalName),
        value: `${item.id}`,
      })),
  }
}

export { getStaffListAction }

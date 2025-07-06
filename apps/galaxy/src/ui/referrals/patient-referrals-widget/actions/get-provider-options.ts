'use server'

import * as api from '@/api'
import { SelectOptionType, StaffResource } from '@/types'
import { getPatientFullName } from '@/utils'

const getProviderOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, {
    isResultsForNameList: true,
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  const transformed = result.data.map((item) => {
    const label = getPatientFullName(item?.legalName)

    return {
      label,
      value: `${item.userId}`,
    }
  })

  return {
    state: 'success',
    data: transformed,
  }
}

export { getProviderOptionsAction }

'use server'

import * as api from '@/api'
import { DEFAULT_STAFF_PAYLOAD_PARAMS } from '@/constants'
import { SelectOptionType, StaffResource } from '@/types'
import { getPatientFullName } from '@/utils'

const getProviderOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<StaffResource[]>(api.GET_STAFF_ENDPOINT, {
   ...DEFAULT_STAFF_PAYLOAD_PARAMS,
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

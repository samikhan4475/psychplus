'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

interface ModifierCode {
  code: string
  displayName: string
}

interface ModifiersResponse {
  codes: ModifierCode[]
}

const getCptCodesListOptions = async (
  value: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.GET<ModifiersResponse>(api.GET_CPT_CODES(value))
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.codes
    ? response.data.codes.map((data) => ({
        value: data.code,
        label: data.code,
      }))
    : []

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getCptCodesListOptions }

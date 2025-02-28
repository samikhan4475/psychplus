'use client'

import * as api from '@/api/api.client'
import { GET_PRACTICES_ENDPOINT } from '@/api/endpoints'
import { Practice, SelectOptionType } from '@/types'

const getPracticesOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<Practice[]>(GET_PRACTICES_ENDPOINT, {})

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPracticesOptionsAction }

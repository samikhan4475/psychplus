'use server'

import * as api from '@/api'
import { Practice, SelectOptionType } from '@/types'

const getPracticesOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<Practice[]>(api.GET_PRACTICES_ENDPOINT, {})

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

'use server'

import * as api from '@/api'
import { GetPayerList, SelectOptionType } from '@/types'

const getPayersListAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.GET<GetPayerList[]>(api.GET_PAYERS)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id.toString(),
    label: data.name,
  }))
  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPayersListAction }

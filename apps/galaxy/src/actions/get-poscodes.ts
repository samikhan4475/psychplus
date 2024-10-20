'use server'

import * as api from '@/api'
import { POSCodeSets, SelectOptionType } from '@/types'

const getPOSCodesOptions = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.GET<POSCodeSets>(api.GET_POS_CODES, {
    next: { revalidate: 3600 },
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.codes.map((data) => ({
    value: data.code,
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPOSCodesOptions }

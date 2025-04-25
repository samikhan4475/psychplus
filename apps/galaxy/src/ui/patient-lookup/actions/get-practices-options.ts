'use server'

import * as api from '@/api'
import { Practice, SelectOptionType } from '@/types'

interface PracticesPayload {
  payload?: {
    organizationId?: string
  }
}

const getPracticesOptionsAction = async ({
  payload,
}: PracticesPayload): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<Practice[]>(
    api.GET_PRACTICES_ENDPOINT,
    payload,
  )

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

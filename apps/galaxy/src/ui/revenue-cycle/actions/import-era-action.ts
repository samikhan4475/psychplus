'use server'

import * as api from '@/api'

const importEraAction = async (
  payload: FormData,
): Promise<api.ActionResult<boolean>> => {
  const url = new URL(api.IMPORT_ERA_ENDPOINT)

  const response = await api.POST<boolean>(`${url}`, payload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { importEraAction }

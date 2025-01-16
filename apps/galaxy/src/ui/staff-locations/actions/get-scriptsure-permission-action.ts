'use server'

import * as api from '@/api'

const DEFAULT_FLAG = 'ehr7406Surescripts'
const getScriptSurePermissionAction = async (): Promise<
  api.ActionResult<boolean>
> => {
  const url = new URL(api.GET_FEATURE_FLAG_ENDPOINT(DEFAULT_FLAG))
  const response = await api.POST<boolean>(`${url}`)

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

export { getScriptSurePermissionAction }

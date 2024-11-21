'use server'

import * as api from '@/api'

const getScriptSureSessionToken = async (
  partnerShortName: string,
): Promise<api.ActionResult<string>> => {
  const response = await api.GET<string>(
    api.GET_SCRIPT_SURE_SESSION_TOKEN(partnerShortName),
  )
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

export { getScriptSureSessionToken }

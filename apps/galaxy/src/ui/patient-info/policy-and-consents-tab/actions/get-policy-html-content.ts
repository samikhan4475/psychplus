'use server'

import * as api from '@/api'

const getPolicyHtmlContent = async (
  fileName: string,
): Promise<api.ActionResult<string>> => {
  const response = await api.GET<string>(api.GET_SHARED_POLICY_FILE(fileName))
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

export { getPolicyHtmlContent }

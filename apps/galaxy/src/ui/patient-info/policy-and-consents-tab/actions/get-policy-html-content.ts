'use server'

import * as api from '@/api'
import { API_URL } from '@/constants'

const getPolicyHtmlContent = async (
  fileName: string,
): Promise<api.ActionResult<string>> => {
  const response = await api.GET<string>(
    `${API_URL}/SharedContent/documents/${fileName}.html`,
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

export { getPolicyHtmlContent }

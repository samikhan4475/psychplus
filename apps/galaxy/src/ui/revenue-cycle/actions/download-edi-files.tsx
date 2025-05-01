'use server'

import * as api from '@/api'
import { getAuthCookies } from '@/utils/auth'

const downloadEdiFilesAction = async (): Promise<api.ActionResult<string>> => {
  const practiceId = getAuthCookies()?.practiceId

  if (!practiceId)
    return {
      state: 'error',
      error: 'Practice Id not found',
    }

  const response = await api.POST<string>(
    api.DOWNLOAD_EDI_FILES_ENDPOINT(practiceId),
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

export { downloadEdiFilesAction }

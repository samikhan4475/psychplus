'use server'

import * as api from '@/api'
import { Template } from '../types'

const getTemplatesAction = async (): Promise<api.ActionResult<Template[]>> => {
  const result = await api.POST<Template[]>(
    api.GET_REPORTS_TEMPLATES_ENDPOINT,
    {
      recordStatuses: [],
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceStatus: true,
      isIncludeParameter: true,
      isIncludeReportFile: true,
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getTemplatesAction }

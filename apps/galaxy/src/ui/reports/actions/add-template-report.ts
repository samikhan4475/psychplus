'use server'

import * as api from '@/api'
import { Template } from '../types'

interface GeneratedReportParams {
  templateId: string
  data: Template | FormData
  isNewFileAttached: boolean
}

const addTemplateReportAction = async ({
  templateId,
  data,
  isNewFileAttached,
}: GeneratedReportParams): Promise<api.ActionResult<Template>> => {
  const url = new URL(api.UPLOAD_TEMPLATE_REPORT_ENDPOINT(templateId))
  url.searchParams.append('isNewFileAttached', String(isNewFileAttached))

  const result = await api.POST<Template>(`${url}`, data, {
    ignoreHeaders: false,
  })

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

export { addTemplateReportAction }

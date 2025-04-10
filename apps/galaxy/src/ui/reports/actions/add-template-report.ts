'use server'

import * as api from '@/api'
import { Template } from '../types'

interface GeneratedReportParams {
  templateId: string
  data: Template | FormData
}

const addTemplateReportAction = async ({
  templateId,
  data,
}: GeneratedReportParams): Promise<api.ActionResult<Template>> => {
  const result = await api.POST<Template>(
    api.UPLOAD_TEMPLATE_REPORT_ENDPOINT(templateId),
    data,
    {
      ignoreHeaders: false,
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

export { addTemplateReportAction }

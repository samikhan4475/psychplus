'use server'

import * as api from '@/api'
import { ReportFilterParameters } from '../types'

interface GeneratedReportParams {
  templateId: string
  reportType: string
  data: ReportFilterParameters[]
}

const getRunReportAction = async ({
  templateId,
  reportType,
  data,
}: GeneratedReportParams): Promise<
  api.ActionResult<string>
> => {
  const result = await api.POST<string>(api.GET_TEMPLATE_REPORT(templateId,reportType), data)
  
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data
  }
}

export { getRunReportAction }




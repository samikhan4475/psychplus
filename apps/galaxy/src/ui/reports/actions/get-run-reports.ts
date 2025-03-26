'use server'

import * as api from '@/api'
import { GeneratedReportParams, GetReportListResponse } from '../types'
import { REPORT_LIST_TABLE_PAGE_SIZE } from '../constans'

interface GetRunReportParams {
  payload: GeneratedReportParams
  page?: number
}

const getRunReportAction = async ({
  payload,
  page = 1,
}: GetRunReportParams): Promise<
  api.ActionResult<GetReportListResponse>
> => {
  const offset = (page - 1) * REPORT_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_TEMPLATE_REPORT(payload.templateId,payload?.reportType))
  url.searchParams.append('limit', String(REPORT_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  const result = await api.POST<string>(`${url}`, payload.data)

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: {
      report: result.data,
      total: Number(result.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getRunReportAction }




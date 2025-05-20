'use client'

import * as api from '@/api/api.client'
import { GET_TEMPLATE_REPORT } from '@/api/endpoints'
import { REPORT_LIST_TABLE_PAGE_SIZE } from '../constans'
import { GeneratedReportParams, GetReportListResponse } from '../types'

interface GetRunReportParams {
  payload: GeneratedReportParams
  page?: number
}

const getRunReportAction = async ({
  payload,
  page = 1,
}: GetRunReportParams): Promise<api.ActionResult<GetReportListResponse>> => {
  const offset = (page - 1) * REPORT_LIST_TABLE_PAGE_SIZE
  const url = `${GET_TEMPLATE_REPORT(
    payload.templateId,
    payload?.reportType,
  )}&limit=${String(REPORT_LIST_TABLE_PAGE_SIZE)}&offset=${String(offset)}`

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

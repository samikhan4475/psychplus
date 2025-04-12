'use server'

import * as api from '@/api'
import {
  RECORD_STATUS,
  REPORT_SCHEDULE_LIST_TABLE_PAGE_SIZE,
} from '../constans'
import {
  GetScheduleReportListResponse,
  ScheduledReport,
  ScheduleReportListParams,
} from '../types'

interface getScheduledReportsListParams {
  scheduledReportPayload: ScheduleReportListParams
  scheduleReportPage?: number
}
const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeParameter: true,
  recordStatuses: [RECORD_STATUS.ACTIVE],
}

const getScheduledReportsListAction = async ({
  scheduledReportPayload,
  scheduleReportPage = 1,
}: getScheduledReportsListParams): Promise<
  api.ActionResult<GetScheduleReportListResponse>
> => {
  const offset = (scheduleReportPage - 1) * REPORT_SCHEDULE_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_SCHEDULES_REPORTS)
  url.searchParams.append('limit', String(REPORT_SCHEDULE_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  const result = await api.POST<ScheduledReport[]>(`${url}`, {
    ...defaultPayload,
    ...scheduledReportPayload,
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: {
      scheduleReports: result.data,
      total: Number(result.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getScheduledReportsListAction }

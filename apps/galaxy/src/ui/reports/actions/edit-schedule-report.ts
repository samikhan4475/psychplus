'use server'

import * as api from '@/api'
import { SchedulingReport } from '../types'

interface EditScheduleReportActionParams {
  scheduleId: string
  data: SchedulingReport
}

const editScheduleReportAction = async ({
  scheduleId,
  data,
}: EditScheduleReportActionParams): Promise<
  api.ActionResult<SchedulingReport>
> => {
  const result = await api.PUT<SchedulingReport>(
    api.EDIT_SCHEDULE_REPORT_ENDPOINT(scheduleId),
    data,
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

export { editScheduleReportAction }

'use server'

import * as api from '@/api'
import { ScheduleJob } from '../types'

interface EditScheduleJobActionParams {
  jobId: string
  data: ScheduleJob
}
const updateScheduleJobAction = async ({
  jobId,
  data,
}: EditScheduleJobActionParams): Promise<api.ActionResult<ScheduleJob>> => {
  const result = await api.PUT<ScheduleJob>(
    api.UPDATE_SCHEDULE_REPORT_JOB_ENDPOINT(jobId),
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

export { updateScheduleJobAction }

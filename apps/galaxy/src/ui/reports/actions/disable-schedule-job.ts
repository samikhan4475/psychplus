'use server'

import * as api from '@/api'
import { Template } from '../types'

const disableScheduleJobAction = async (
  jobId: string,
): Promise<api.ActionResult<Template>> => {
  const result = await api.POST<Template>(
    api.DISABLE_SCHEDULE_REPORT_JOB(jobId),
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

export { disableScheduleJobAction }

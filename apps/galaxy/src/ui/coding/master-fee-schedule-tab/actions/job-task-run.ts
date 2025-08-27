'use server'

import * as api from '@/api'
import { TaskRunResponse } from '../../types'

const jobTaskRunAction = async (
  jobTaskRunId: string,
): Promise<api.ActionResult<TaskRunResponse>> => {
  const url = new URL(api.RUN_JOBTASK_ENDPOINT(jobTaskRunId))
  url.searchParams.append('isIncludeOutput', 'true')

  const response = await api.GET<TaskRunResponse>(String(url))
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { jobTaskRunAction }

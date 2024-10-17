'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { ClaimSubmissionHistoryDetail } from '../submission-tab/submission-history-tab/types'

const getSubmissionHistoryDetail = async (
  batchId: string,
  sort?: Sort,
): Promise<api.ActionResult<ClaimSubmissionHistoryDetail[]>> => {
  const url = new URL(api.GET_CLAIM_SUBMISSION_HISTORY_DETAIL(batchId))
  if (sort)
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)

  const result = await api.POST<ClaimSubmissionHistoryDetail[]>(
    url.toString(),
    {},
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

export { getSubmissionHistoryDetail }

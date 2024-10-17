'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { SUBMISSION_TABLE_PAGE_SIZE } from '../submission-tab/constants'
import { SchemaType } from '../submission-tab/submission-history-tab/submission-history-filter-form'
import { ClaimSubmissionHistory, SearchSubmissionHistoryData } from '../submission-tab/submission-history-tab/types'

interface SearchHistoryParams extends Partial<SchemaType> {
  page?: number
  sort?: Sort
}

const getSubmissionHistory = async ({
  page = 1,
  sort,
  ...rest
}: SearchHistoryParams): Promise<
  api.ActionResult<SearchSubmissionHistoryData>
> => {
  const offset = (page - 1) * SUBMISSION_TABLE_PAGE_SIZE

  const url = new URL(api.GET_CLAIM_SUBMISSION_HISTORY)
  url.searchParams.append('limit', String(SUBMISSION_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const result = await api.POST<ClaimSubmissionHistory[]>(url.toString(), rest)
  const total = Number(result.headers.get('psychplus-totalresourcecount'))
  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: {
      submissionHistory: result.data,
      total: total,
    },
  }
}

export { getSubmissionHistory }

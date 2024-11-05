'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { SUBMITTER_LIST_TABLE_PAGE_SIZE } from '../constants'
import {
  RecordStatuses,
  type ClearingHouseSubmitter,
  type GetSubmitterListResponse,
} from '../types'

interface GetSubmitterListParams {
  payload?: Partial<ClearingHouseSubmitter>
  page?: number
  sort?: Sort
}
const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: [RecordStatuses.ACTIVE],
}

const getSubmitterListAction = async ({
  payload,
  page = 1,
  sort,
}: GetSubmitterListParams): Promise<
  api.ActionResult<GetSubmitterListResponse>
> => {
  const offset = (page - 1) * SUBMITTER_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_CLEARNING_HOUSE_SUBMITTER_ENDPOINT)
  url.searchParams.append('limit', String(SUBMITTER_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<ClearingHouseSubmitter[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      submitters: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getSubmitterListAction }

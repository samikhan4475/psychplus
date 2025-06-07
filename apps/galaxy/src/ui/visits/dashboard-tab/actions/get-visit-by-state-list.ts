'use client'

import * as api from '@/api/api.client'
import { GET_VISIT_BY_STATE_LIST_ENDPOINT } from '@/api/endpoints'
import { Sort } from '@/types'
import {
  StateVisits,
  StateVisitsListResponse,
  StateVisitsParams,
} from '../../types'

interface GetVisitByStateListParams {
  payload?: Partial<StateVisitsParams>
  page?: number
  sort?: Sort
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getVisitByStateListAction = async ({
  payload,
  sort,
}: GetVisitByStateListParams): Promise<
  api.ActionResult<StateVisitsListResponse>
> => {
  let urlString = GET_VISIT_BY_STATE_LIST_ENDPOINT
  //Todo for now removed pagination will be added later
  // const offset = (page - 1) * ALL_VISITS_LIST_TABLE_PAGE_SIZE
  // urlString += `?limit=${ALL_VISITS_LIST_TABLE_PAGE_SIZE}&offset=${offset}`

  if (sort) {
    urlString += `?orderBy=${sort.column} ${sort.direction}`
  }

  const response = await api.POST<StateVisits[]>(urlString, {
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
      StateVisits: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getVisitByStateListAction }

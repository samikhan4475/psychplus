'use client'

import * as api from '@/api/api.client'
import { GET_ALL_VISITS_LIST_ENDPOINT } from '@/api/endpoints'
import { Sort } from '@/types'
import {
  AllVisits,
  AllVisitsParams,
  GetAllVisitsListResponse,
} from '../../types'

interface GetAllVisitsListParams {
  payload?: Partial<AllVisitsParams>
  page?: number
  sort?: Sort
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getAllVisitsListAction = async ({
  payload,
  sort,
}: GetAllVisitsListParams): Promise<
  api.ActionResult<GetAllVisitsListResponse>
> => {
  let urlString = GET_ALL_VISITS_LIST_ENDPOINT
  //Todo for now removed pagination will be added later
  // const offset = (page - 1) * ALL_VISITS_LIST_TABLE_PAGE_SIZE
  // urlString += `?limit=${ALL_VISITS_LIST_TABLE_PAGE_SIZE}&offset=${offset}`

  if (sort) {
    urlString += `?orderBy=${sort.column} ${sort.direction}`
  }

  const response = await api.POST<AllVisits[]>(urlString, {
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
      allVisits: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllVisitsListAction }

'use server'

import * as api from '@/api'
import { GetIdProofingActionResponse, GetIdProofingActionPayload,GetIdProofingResponse } from '../types'
import { PAGE_SIZE_LIMIT } from '../constants'
import { Sort } from '@/types'

interface GetIdProofingActionProps {
  payload?: GetIdProofingActionPayload
  page?: number
  sort?: Sort
}

const getIdProofings = async ({
  payload,
  page = 1,
  sort
}: GetIdProofingActionProps): Promise<
  api.ActionResult<GetIdProofingActionResponse>
> => {
  const url = new URL(api.GET_USERS_SELF_PROOFINGS_ENDPOINT)
  const offset = (page - 1) * PAGE_SIZE_LIMIT

  url.searchParams.append('limit', String(PAGE_SIZE_LIMIT))
  url.searchParams.append('offset', String(offset))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<GetIdProofingResponse[]>(`${url}`, payload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      userProofings: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getIdProofings }

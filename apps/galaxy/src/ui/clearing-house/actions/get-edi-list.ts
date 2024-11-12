'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { EDI_LIST_TABLE_PAGE_SIZE } from '../constants'
import { RecordStatuses, type EdiItem, type GetEdiListResponse } from '../types'

interface GetClaimsListParams {
  payload?: Partial<EdiItem>
  page?: number
  sort?: Sort
}

const defaultPayload = {
  isIncludeInsurancePlan: true,
  isIncludeClearingHouseReceiver: true,
  recordStatuses: [RecordStatuses.ACTIVE],
}

const getEdiListAction = async ({
  payload,
  page = 1,
  sort,
}: GetClaimsListParams): Promise<api.ActionResult<GetEdiListResponse>> => {
  const offset = (page - 1) * EDI_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_CLEARNING_HOUSE_EDI_ENDPOINT)
  url.searchParams.append('limit', String(EDI_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<EdiItem[]>(`${url}`, {
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
      ediList: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getEdiListAction }

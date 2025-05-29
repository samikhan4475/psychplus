'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { PREFERRED_PARTNER_LIST_TABLE_PAGE_SIZE } from '../constants'
import {
  PreferredPartnerItem,
  PreferredPartnerListPayload,
  PreferredPartnerListResponse,
} from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
interface GetPreferredPartnerListParams {
  payload?: Partial<PreferredPartnerListPayload>
  page?: number
  sort?: Sort
}

const getPreferredPartnerListAction = async ({
  payload,
  page = 1,
  sort,
}: GetPreferredPartnerListParams): Promise<
  api.ActionResult<PreferredPartnerListResponse>
> => {
  const offset = (page - 1) * PREFERRED_PARTNER_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PREFERRED_PARTNER_LIST_ENDPOINT)
  url.searchParams.append(
    'limit',
    String(PREFERRED_PARTNER_LIST_TABLE_PAGE_SIZE),
  )
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<PreferredPartnerItem[]>(`${url}`, {
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
      preferredPartners: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPreferredPartnerListAction }

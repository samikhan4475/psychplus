'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { SERVICE_UNITS_TABLE_PAGE_SIZE } from '../constants'
import type {
  GetServiceUnitListResponse,
  ServiceUnit,
  ServiceUnitSearchParams,
} from '../types'

interface GetServiceUnitsListParams {
  payload?: ServiceUnitSearchParams
  page?: number
  sort?: Sort
}

const defaultPayload: ServiceUnitSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getAllServiceUnitsAction = async ({
  payload,
  page = 1,
  sort,
}: GetServiceUnitsListParams): Promise<
  api.ActionResult<GetServiceUnitListResponse>
> => {
  const offset = (page - 1) * SERVICE_UNITS_TABLE_PAGE_SIZE

  const url = new URL(api.SERVICE_UNITS_ENDPOINT)
  url.searchParams.append('limit', String(SERVICE_UNITS_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<ServiceUnit[]>(`${url}`, {
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
      units: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getAllServiceUnitsAction }

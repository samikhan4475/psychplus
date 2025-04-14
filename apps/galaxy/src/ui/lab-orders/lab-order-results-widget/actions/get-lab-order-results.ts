'use server'

import * as api from '@/api'
import { LabOrderResponseList, LabOrders , Sort } from '@/types'
import { LABS_ORDER_TABLE_PAGE_SIZE } from '../constant'
import {LabOrderResultPayload } from '../types'

interface GetLabOrdersResultsActionProps {
  payload?: LabOrderResultPayload
  page?: number
  sort?: Sort
}

const getLabOrderResults = async ({
  payload,
  page = 1,
  sort
}: GetLabOrdersResultsActionProps): Promise<
  api.ActionResult<LabOrderResponseList>
> => {
  const url = new URL(api.GET_LAB_ORDER_RESULTS)
  const offset = (page - 1) * LABS_ORDER_TABLE_PAGE_SIZE

  url.searchParams.append('limit', String(LABS_ORDER_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  
  const response = await api.POST<LabOrders[]>(`${url}`, payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      labOrders: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getLabOrderResults }

'use server'

import * as api from '@/api'
import { LabOrderResponseList, LabOrders, Sort } from '@/types'
import { LABS_ORDER_TABLE_PAGE_SIZE } from '../constant'
import { LabOrderPayload } from '../types'

interface GetLabOrdersActionProps {
  appointmentId: string | null
  payload?: LabOrderPayload
  page?: number
  limit?: number,
  sort?: Sort
}

const getLabOrdersAction = async ({
  appointmentId,
  payload,
  page = 1,
  limit = LABS_ORDER_TABLE_PAGE_SIZE,
  sort
}: GetLabOrdersActionProps): Promise<
  api.ActionResult<LabOrderResponseList>
> => {
  const url = appointmentId
    ? new URL(api.GET_LAB_ORDERS(appointmentId))
    : new URL(api.GET_LAB_ORDERS_SEARCH)
  const offset = (page - 1) * limit

  url.searchParams.append('limit', String(limit))
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

export { getLabOrdersAction }

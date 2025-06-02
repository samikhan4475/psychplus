'use client'

import * as api from '@/api/api.client'
import { GET_LAB_ORDERS, GET_LAB_ORDERS_SEARCH } from '@/api/endpoints'
import { LabOrderResponseList, LabOrders, Sort } from '@/types'
import { LABS_ORDER_TABLE_PAGE_SIZE } from '../constant'
import { LabOrderPayload } from '../types'

interface GetLabOrdersActionProps {
  appointmentId: string | null
  payload?: LabOrderPayload
  page?: number
  limit?: number
  sort?: Sort
}

const getLabOrdersAction = async ({
  appointmentId,
  payload,
  page = 1,
  limit = LABS_ORDER_TABLE_PAGE_SIZE,
  sort,
}: GetLabOrdersActionProps): Promise<
  api.ActionResult<LabOrderResponseList>
> => {
  let urlString = appointmentId
    ? GET_LAB_ORDERS(appointmentId)
    : GET_LAB_ORDERS_SEARCH

  const offset = (page - 1) * limit
  urlString += `?limit=${limit}&offset=${offset}`

  if (sort) {
    urlString += `?orderBy=${sort.column} ${sort.direction}`
  }

  const response = await api.POST<LabOrders[]>(urlString, {
    ...payload,
    ResourceStatusList: ['Active'],
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
      labOrders: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getLabOrdersAction }

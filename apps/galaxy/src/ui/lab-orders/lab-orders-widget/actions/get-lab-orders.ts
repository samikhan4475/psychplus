'use server'

import * as api from '@/api'
import { LabOrderResponseList, LabOrders } from '@/types'
import { LABS_ORDER_TABLE_PAGE_SIZE } from '../constant'
import { LabOrderPayload } from '../types'

interface GetLabOrdersActionProps {
  appointmentId: string | null
  payload?: LabOrderPayload
  page?: number
}

const getLabOrdersAction = async ({
  appointmentId,
  payload,
  page = 1,
}: GetLabOrdersActionProps): Promise<
  api.ActionResult<LabOrderResponseList>
> => {
  const url = appointmentId
    ? new URL(api.GET_LAB_ORDERS(appointmentId))
    : new URL(api.GET_LAB_ORDERS_SEARCH)
  const offset = (page - 1) * LABS_ORDER_TABLE_PAGE_SIZE

  url.searchParams.append('limit', String(LABS_ORDER_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

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

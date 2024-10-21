'use server'

import * as api from '@/api'
import { ClearingHouseReceiver } from '../types'

const clearningHouseReceiversAction = async (
  payload?: Partial<ClearingHouseReceiver>,
): Promise<api.ActionResult<ClearingHouseReceiver[]>> => {
  const response = await api.POST<ClearingHouseReceiver[]>(
    api.GET_CLEARNING_HOUSE_RECEIVERS,
    payload ?? {},
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { clearningHouseReceiversAction }

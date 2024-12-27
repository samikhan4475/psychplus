'use server'

import * as api from '@/api'
import { SpecimenData } from '../blocks/types'

const getSpecimenApi = async (
  appointmentId: number | string,
  orderId: string,
): Promise<api.ActionResult<SpecimenData[]>> => {
  const response = await api.POST<SpecimenData[]>(
    api.GET_LAB_TEST_SPECIMEN(appointmentId, orderId),
    {
      orderId: orderId,
      resourceStatusList: ['Active'],
    },
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

export { getSpecimenApi }

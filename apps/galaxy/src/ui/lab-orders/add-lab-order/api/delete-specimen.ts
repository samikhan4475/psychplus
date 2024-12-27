'use server'

import * as api from '@/api'
import { SpecimenData } from '../blocks/types'

const deleteSpecimenApi = async (
  appointmentId: number | string,
  orderId: string,
  specimenId: string,
): Promise<api.ActionResult<SpecimenData>> => {
  const response = await api.DELETE<SpecimenData>(
    api.EDIT_DELETE_LAB_TEST_SPECIMEN(appointmentId, orderId, specimenId),
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

export { deleteSpecimenApi }

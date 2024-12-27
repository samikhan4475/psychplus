'use server'

import * as api from '@/api'
import { SpecimenData } from '../blocks/types'

const editSpecimenApi = async (
  appointmentId: number | string,
  payload: SpecimenData,
): Promise<api.ActionResult<SpecimenData>> => {
  const response = await api.PUT<SpecimenData>(
    api.EDIT_DELETE_LAB_TEST_SPECIMEN(
      appointmentId,
      payload?.orderId ?? '',
      payload?.id ?? '',
    ),
    payload,
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

export { editSpecimenApi }

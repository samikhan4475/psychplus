'use server'

import * as api from '@/api'
import { SpecimenData } from '../blocks/types'

const addSpecimenApi = async (
  payload: SpecimenData,
): Promise<api.ActionResult<SpecimenData>> => {
  const response = await api.POST<SpecimenData>(
    api.ADD_LAB_TEST_SPECIMEN(payload?.TestId ?? ''),
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

export { addSpecimenApi }

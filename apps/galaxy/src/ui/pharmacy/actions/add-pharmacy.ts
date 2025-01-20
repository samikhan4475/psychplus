'use server'

import * as api from '@/api'
import type { Pharmacy } from '../types'

const addPharmacyAction = async (
  patientId: string,
  pharmacyId: string,
): Promise<api.ActionResult<Pharmacy[]>> => {
  const response = await api.POST<Pharmacy[]>(
    api.ADD_PHARMACY(patientId, pharmacyId),
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

export { addPharmacyAction }

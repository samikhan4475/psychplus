'use server'

import * as api from '@/api'
import type { Pharmacy } from '../types'

const deletePharmacyAction = async (
  pharmacyId: string,
  patientId: string,
): Promise<api.ActionResult<Pharmacy[]>> => {
  const response = await api.DELETE<Pharmacy[]>(
    api.DELETE_PHARMACY(pharmacyId, patientId),
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

export { deletePharmacyAction }

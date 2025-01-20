'use server'

import * as api from '@/api'
import type { Pharmacy } from '../types'

const priorityPharmacyAction = async (
  pharmacyId: string,
  patientId: string,
): Promise<api.ActionResult<Pharmacy[]>> => {
  const response = await api.POST<Pharmacy[]>(
    api.PRIORITY_PHARMACY(pharmacyId, patientId),
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

export { priorityPharmacyAction }

'use server'

import * as api from '@/api'
import { Pharmacy, PharmacyParams } from '@/ui/pharmacy/types'

const searchPharmaciesAction = async (
  patientId: string,
  payload?: PharmacyParams,
): Promise<api.ActionResult<{ label: string; value: string }[]>> => {
  const updatedPayload = {
    ...payload,
    recordStatuses: ['Active'],
    patientIds: [patientId],
  }

  const response = await api.POST<Pharmacy[]>(
    api.SEARCH_PHARMACIES(patientId),
    updatedPayload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const filterPharmacies = response.data.filter(
    (data) => data.externalPharmacyId !== '',
  )

  const transformedData = filterPharmacies.map((data) => ({
    label: data.pharmacyName,
    value: String(data.externalPharmacyId),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { searchPharmaciesAction }

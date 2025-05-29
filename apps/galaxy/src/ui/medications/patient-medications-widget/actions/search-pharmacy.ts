'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import { Pharmacy, PharmacyParams } from '@/ui/pharmacy/types'

const searchPharmaciesAction = async (
  patientId: string,
  payload?: PharmacyParams,
): Promise<api.ActionResult<SelectOptionType[]>> => {
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

  const transformedData = response?.data?.reduce(
    (acc: SelectOptionType[], item) => {
      if (item?.externalPharmacyId) {
        acc.push({ value: item?.pharmacyId, label: item?.pharmacyName })
      }
      return acc
    },
    [],
  )
  return {
    state: 'success',
    data: transformedData,
  }
}

export { searchPharmaciesAction }

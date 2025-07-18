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
        const contact = item.pharmacyContactDetails
        const phone = contact?.phoneNumbers?.[0]?.number || ''
        const address = contact?.addresses?.[0]
        const formattedAddress = address
          ? `${address.street1}, ${address.city}, ${address.state},${address.postalCode}, ${address.country}`
          : ''
        const label = `${
          item.pharmacyName || 'Unknown'
        } | ${phone} | ${formattedAddress}`
        acc.push({
          value: item?.pharmacyId,
          label: label,
          externalPharmacyId: item?.externalPharmacyId,
        })
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

'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import { Pharmacy } from '@/ui/pharmacy/types'

const searchPharmacies = async (
  search: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.GET_PHARMACIES)
  const payload = {
    organizationName: search,
    isOnlyDefaults: false,
  }
  const response = await api.POST<Pharmacy[]>(url.toString(), payload)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const transformedData = response?.data?.reduce(
    (acc: SelectOptionType[], item) => {
      if (item?.ncpdpId) {
        const contact = item.contactDetails
        const phone = contact?.phoneNumbers?.[0]?.number || ''
        const address = contact?.addresses?.[0]
        const formattedAddress = address
          ? `${address.street1}, ${address.city}, ${address.state},${address.postalCode}, ${address.country}`
          : ''

        const label = `${
          item.name || 'Unknown'
        } | ${phone} | ${formattedAddress}`

        acc.push({
          value: item.id,
          label,
          ncpdpId: item.ncpdpId,
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

export { searchPharmacies }

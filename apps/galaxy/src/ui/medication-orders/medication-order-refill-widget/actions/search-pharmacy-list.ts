'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import { Pharmacy } from '@/ui/pharmacy-management/types'

const searchPharmaciesAction = async (
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
  const transformedData = response.data.map((data) => ({
    value: data.id ?? '',
    label: data.name,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { searchPharmaciesAction }

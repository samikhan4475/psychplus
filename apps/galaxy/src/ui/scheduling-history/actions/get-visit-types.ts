'use server'

import * as api from '@/api'
import { Encounter } from '@/types'
import { SelectOptionType } from '../types'

const getVisitTypesAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<Encounter[]>(api.GET_VISIT_TYPE_ENDPOINT, {})

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  const transformedData = result?.data?.map((item) => ({
    label: item.encounterName,
    value: String(item.id),
    servicesOffered: item.encounterToServices?.[0]?.serviceOffered,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getVisitTypesAction }

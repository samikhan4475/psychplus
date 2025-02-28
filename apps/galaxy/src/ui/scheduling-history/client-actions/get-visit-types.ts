'use client'

import * as api from '@/api/api.client'
import { GET_VISIT_TYPE_ENDPOINT } from '@/api/endpoints'
import { Encounter } from '@/types'
import { SelectOptionType } from '../types'

const getVisitTypesAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<Encounter[]>(GET_VISIT_TYPE_ENDPOINT, {})

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  const transformedData = result?.data?.map((item) => ({
    label: `${item.typeOfVisit} | ${item.visitSequence} | ${item.visitMedium}`,
    value: String(item.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getVisitTypesAction }

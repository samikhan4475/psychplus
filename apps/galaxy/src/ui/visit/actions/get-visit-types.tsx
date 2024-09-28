'use server'

import * as api from '@/api'
import { VisitType } from '@/types'

const getVisitTypes = async ({
  locationId,
  serviceId,
}: {
  locationId: string
  serviceId: string
}): Promise<api.ActionResult<VisitType[]>> => {
  const url = new URL(api.VISIT_TYPES_ENDPOINT)
  url.searchParams.append('limit', String(0))
  url.searchParams.append('offset', String(0))
  url.searchParams.append('orderBy', 'Id asc')

  const response = await api.POST<VisitType[]>(url.toString(), {
    locationId,
    serviceId,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return { state: 'success', data: response.data }
}

export { getVisitTypes }

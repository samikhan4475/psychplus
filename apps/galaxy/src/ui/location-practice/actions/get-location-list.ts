'use server'

import * as api from '@/api'
import { LocationPractice } from '@/types'
import { GetLocationListResponse } from '../institutional-practices'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeLocation: true,
  isIncludePractice: true,
  isIncludeOrganization: true,
  isIncludePracticeAddress: true,
}

interface PayloadParams {
  locationId: string
  practiceType?: string
}

const getLocationListAction = async ({
  locationId,
  practiceType,
}: PayloadParams): Promise<api.ActionResult<GetLocationListResponse>> => {
  const url = new URL(api.LOCATION_PRACTICES_ENDPOINT(locationId))
  const response = await api.POST<LocationPractice[]>(url?.toString(), {
    ...defaultPayload,
    practiceType,
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      locations: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getLocationListAction }

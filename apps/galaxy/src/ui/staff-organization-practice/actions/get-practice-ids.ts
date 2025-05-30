'use client'

import * as api from '@/api/api.client'
import { GET_PRACTICES_ENDPOINT } from '@/api/endpoints'
import { SelectOptionType } from '@/types'

enum recordStatuses {
  ACTIVE = 'Active',
}

const defaultPayloadPracticeList = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: [recordStatuses.ACTIVE],
}

interface PracticeList {
  id: string
  displayName: string
}

interface Payload {
  organizationId: string
  partialShortName?: string
}

interface GetPracticeProps {
  payload: Payload
}

const getPracticeIdsAction = async ({
  payload,
}: GetPracticeProps): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<PracticeList[]>(GET_PRACTICES_ENDPOINT, {
    ...defaultPayloadPracticeList,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPracticeIdsAction }

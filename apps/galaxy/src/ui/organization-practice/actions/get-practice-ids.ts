'use client'

import * as api from '@/api/api.client'
import { GET_PRACTICE_IDS_LIST_ENDPOINT } from '@/api/endpoints'
import { SelectOptionType } from '@/types'

enum recordStatuses {
  ACTIVE = 'Active',
}

const defaultPayloadPracticeList = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: [recordStatuses.ACTIVE],
  includeOrganziation: false,
  includeUsers: false,
  includeRoles: false,
  includePermissions: false,
  isIncludeLocations: false,
  isIncludePracticeAddressLocation: false,
  isIncludePaymentAddressLocation: false,
}

interface PracticeList {
  id: string
  displayName: string
}

const getPracticeIdsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<PracticeList[]>(
    GET_PRACTICE_IDS_LIST_ENDPOINT,
    defaultPayloadPracticeList,
  )

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

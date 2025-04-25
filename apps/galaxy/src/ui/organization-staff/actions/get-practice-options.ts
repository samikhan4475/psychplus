'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  isIncludeLocations: false,
  includeUsers: false,
  includeOrganization: false,
  includeRoles: false,
  includeLocations: false,
  isIncludePracticeAddressLocation: false,
  isIncludePaymentAddressLocation: false,
  includePermissions: false,
}

interface Practice {
  id: string
  displayName: string
}

interface PracticePayoad {
  payload: {
    organizationId?: string
    practiceId?: string
  }
}

const getPracticeOptionsAction = async ({
  payload,
}: PracticePayoad): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<Practice[]>(api.GET_PRACTICES_ENDPOINT, {
    ...defaultPayload,
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

export { getPracticeOptionsAction }

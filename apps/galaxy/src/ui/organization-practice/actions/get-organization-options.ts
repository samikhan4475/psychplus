'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import { DEFAULT_STATUSES } from '../constants'
import type { Organization, OrganizationsSearchParams } from '../types'

const defaultPayload: OrganizationsSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: false,
  isIncludeLocations: false,
  recordStatuses: DEFAULT_STATUSES,
}

const getOrganizationOptionsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<Organization[]>(
    api.GET_ORGANIZATIONS_ENDPOINT,
    {
      ...defaultPayload,
    },
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

export { getOrganizationOptionsAction }

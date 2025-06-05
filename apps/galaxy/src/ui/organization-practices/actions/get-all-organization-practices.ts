'use client'

import * as api from '@/api/api.client'
import { GET_ORGANIZATION_PRACTICES_ENDPOINT } from '@/api/endpoints'
import { Sort } from '@/types'
import { DEFAULT_STATUSES } from '../../organization-practice/constants'
import type {
  OrganizationsSearchParams,
  Practice,
} from '../../organization-practice/types'

interface GetOrganizationsListParams {
  payload?: OrganizationsSearchParams
  sort?: Sort
}

const defaultPayload: OrganizationsSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeLocations: true,
  recordStatuses: DEFAULT_STATUSES,
  includePractices: true,
  includeUsers: false,
  includeRoles: false,
  includePermissions: false,
  isIncludePracticeAddressLocation: true,
  isIncludeClearingHouseReceiver:true,
  isIncludePaymentAddressLocation: true,
}

const getAllOrganizationPracticesListAction = async ({
  payload,
  sort,
}: GetOrganizationsListParams): Promise<api.ActionResult<Practice[]>> => {
  let url = GET_ORGANIZATION_PRACTICES_ENDPOINT
  if (sort) {
    url = url + '?orderBy=' + `${sort.column} ${sort.direction}`
  }

  const response = await api.POST<Practice[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { getAllOrganizationPracticesListAction }

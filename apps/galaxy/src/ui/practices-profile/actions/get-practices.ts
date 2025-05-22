'use server'

import * as api from '@/api'
import { PracticeResource } from '@/types'
import { DEFAULT_STATUSES } from '../../organization-practice/constants'

interface Payload {
  practiceId: string
}

interface GetOrganizationsListParams {
  payload?: Payload
}

const defaultPayload = {
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
  isIncludePaymentAddressLocation: true,
  includeOrganization: true,
}

const getPracticesListAction = async ({
  payload,
}: GetOrganizationsListParams): Promise<
  api.ActionResult<PracticeResource[]>
> => {
  const url = new URL(api.GET_ORGANIZATION_PRACTICES_ENDPOINT)

  const response = await api.POST<PracticeResource[]>(`${url}`, {
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

export { getPracticesListAction }

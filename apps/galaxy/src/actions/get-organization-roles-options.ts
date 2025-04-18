'use server'

import * as api from '@/api'
import { Role, SelectOptionType } from '@/types'

const defaultPayloadPracticeList = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeOrganizationSpecific: true,
}

interface Payload {
  organizationId: string
  partialShortName?: string
}

interface GetPracticeProps {
  payload: Payload
}

const getOrganizationRolesAction = async ({
  payload,
}: GetPracticeProps): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<Role[]>(
    api.GET_ORGANIZATION_PRACTICES_ROLES_ENDPOINT,
    {
      ...defaultPayloadPracticeList,
      ...payload,
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

export { getOrganizationRolesAction }

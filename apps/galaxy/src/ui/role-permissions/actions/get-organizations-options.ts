'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import type {
  Organization,
  OrganizationsSearchParams,
} from '../../organization-practice/types'

interface GetOrganizationsListParams {
  payload?: OrganizationsSearchParams
}

const defaultPayload: OrganizationsSearchParams = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getAllOrganizationsOptionsListAction = async ({
  payload,
}: GetOrganizationsListParams): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const url = new URL(api.GET_ORGANIZATIONS_ENDPOINT)

  const response = await api.POST<Organization[]>(`${url}`, {
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
    label: data.shortName,
  }))
  return {
    state: 'success',
    data: transformedData,
  }
}

export { getAllOrganizationsOptionsListAction }

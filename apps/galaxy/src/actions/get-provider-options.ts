'use server'

import * as api from '@/api'
import {
  DEFAULT_STAFF_PAYLOAD_PARAMS,
  STAFF_ROLE_CODE_PRESCRIBER,
} from '@/constants'
import { SelectOptionType, StaffResource } from '@/types'
import { sanitizeFormData } from '@/utils'

const getProvidersOptionsAction = async (
  payload: {
    name?: string
    providerType?: string
    practicesIds?: string[]
    isResultsForNameList?: boolean
    includeInactive?: boolean
    isIncludePractices?: boolean
  } = {},
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const { includeInactive, isIncludePractices = false, ...rest } = payload
  const body = {
    roleCodes: [STAFF_ROLE_CODE_PRESCRIBER],
    ...DEFAULT_STAFF_PAYLOAD_PARAMS,
    isIncludePractices,
    ...rest,
  }
  const url = new URL(`${api.GET_STAFF_ENDPOINT}`)

  if (includeInactive) url.searchParams.append('includeInactive', 'true')

  const response = await api.POST<StaffResource[]>(
    String(url),
    sanitizeFormData(body),
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    label: `${data.legalName.firstName} ${data.legalName.lastName}, ${data.legalName.honors}`,
    value: String(data.id),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getProvidersOptionsAction }

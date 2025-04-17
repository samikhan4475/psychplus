'use server'

import * as api from '@/api'
import type { Users, UsersSearchParam } from '../types'

interface GetUsersDataListParam {
  payload?: UsersSearchParam
}
const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeTestPatients: true,
  isIncludeInsurance: true,
  isIncludeInsuranceVerification: true,
  isIncludeCardVerification: true,
  isIncludeConsentVerification: true,
  isIncludeMostUpcomingAppointment: true,
  isIncludeMostRecentAppointment: true,
}

const searchOrganizationUsersAction = async ({
  ...payload
}: UsersSearchParam): Promise<api.ActionResult<Users[]>> => {

  const url = new URL(api.SEARCH_PATIENTS_ENDPOINT)

  const response = await api.POST<Users[]>(url.toString(), {
    ...payload,
    ...defaultPayload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data
  }
}

export { searchOrganizationUsersAction,  type GetUsersDataListParam }

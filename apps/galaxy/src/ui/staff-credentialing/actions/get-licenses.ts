'use server'

import * as api from '@/api'
import { GetLicensesResponse, LicenseStatus, LicenseType } from '../types'

export interface GetLicensesParams {
  providerStaffIds: number[]
  statuses?: LicenseStatus[] | null
  licenseTypes: LicenseType[]
  locationStateIds?: string[] | null
  startDate?: string | null
  endDate?: string | null
  recordStatuses?: string[]
}

const getLicensesAction = async (
  payload?: GetLicensesParams,
): Promise<api.ActionResult<GetLicensesResponse>> => {
  const response = await api.POST<GetLicensesResponse[]>(
    api.GET_STAFF_LICENSE,
    payload,
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data[0]
      ? response.data[0]
      : {
          licenses: [],
          legalName: {
            firstName: '',
            lastName: '',
          },
          staffId: payload?.providerStaffIds?.[0] ?? 0,
          userId: 0,
        },
  }
}

export { getLicensesAction }

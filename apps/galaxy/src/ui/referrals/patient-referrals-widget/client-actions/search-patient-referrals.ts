'use client'

import * as api from '@/api/api.client'
import { GET_PATIENT_REFERRALS_ENDPOINT } from '@/api/endpoints'
import { PATIENT_REFERRALS_TABLE_PAGE_SIZE } from '@/constants'
import type {
  GetPatientReferralsParams,
  GetPatientReferralsResponse,
  PatientReferral,
} from '../types'

const searchPatientReferralsAction = async ({
  patientIds,
  payload,
  page = 1,
  IsIncludeInsurance = false,
}: GetPatientReferralsParams): Promise<
  api.ActionResult<GetPatientReferralsResponse>
> => {
  let url = GET_PATIENT_REFERRALS_ENDPOINT
  if (page) {
    const pageSize = PATIENT_REFERRALS_TABLE_PAGE_SIZE ?? 20
    const offset = (page - 1) * pageSize
    url += `?limit=${pageSize}&offset=${offset}`
  }

  const response = await api.POST<PatientReferral[]>(url, {
    patientIds,
    IsIncludeInsurance,
    ...payload,
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: {
      referrals: response.data,
      total,
    },
  }
}

export { searchPatientReferralsAction }

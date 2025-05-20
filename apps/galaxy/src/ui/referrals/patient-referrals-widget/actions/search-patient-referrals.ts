'use server'

import * as api from '@/api'
import { PATIENT_REFERRALS_TABLE_PAGE_SIZE } from '../constants'
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
  sort,
}: GetPatientReferralsParams): Promise<
  api.ActionResult<GetPatientReferralsResponse>
> => {
  const offset = (page - 1) * PATIENT_REFERRALS_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PATIENT_REFERRALS_ENDPOINT)
  url.searchParams.append('limit', String(PATIENT_REFERRALS_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  } else {
    url.searchParams.append('orderBy', 'servicesStatus desc')
  }

  const response = await api.POST<PatientReferral[]>(url.toString(), {
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

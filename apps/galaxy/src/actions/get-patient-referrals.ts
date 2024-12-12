'use server'

import * as api from '@/api'
import type { GetPatientReferralsParams, PatientReferral } from '@/types'
import { PATIENT_REFERRALS_TABLE_PAGE_SIZE } from '../constants'

const getPatientReferralsAction = async ({
  patientIds,
  payload = {},
  page,
  tags,
}: GetPatientReferralsParams): Promise<
  api.ActionResult<{
    referrals: PatientReferral[]
    total: number
  }>
> => {
  const url = new URL(api.GET_PATIENT_REFERRALS_ENDPOINT)
  if (page) {
    const offset = (page - 1) * PATIENT_REFERRALS_TABLE_PAGE_SIZE
    url.searchParams.append('limit', String(PATIENT_REFERRALS_TABLE_PAGE_SIZE))
    url.searchParams.append('offset', String(offset))
  }
  const response = await api.POST<PatientReferral[]>(
    url.toString(),
    {
      patientIds,
      ...payload,
    },
    { ...(tags?.length && { next: { tags } }) },
  )

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

export { getPatientReferralsAction }

'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { EligibilityLogRequestPayload, EligibilityLogResponse } from '../types'

const defaultPayload = {
  isIncludePractice: true,
  isIncludePatientData: true,
  isIncludePatientInsurancePolicy: true,
  isIncludeProvider: true,
  isIncludeUser: true,
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeLocation: true,
}

interface GetEligibilityLogParams {
  payload?: Partial<EligibilityLogRequestPayload>
  page?: number
  sort?: Sort
  pageSize?: number
}

const getEligibilityLogAction = async ({
  payload,
  page,
  sort,
  pageSize,
}: GetEligibilityLogParams): Promise<
  api.ActionResult<EligibilityLogResponse[]>
> => {
  const url = new URL(
    api.GET_PATIENT_ELIGIBILITY_LOG_ENDPOINT(payload?.patientId ?? ''),
  )
  if (page && pageSize) {
    const offset = (page - 1) * pageSize
    url.searchParams.append('limit', String(pageSize))
    url.searchParams.append('offset', String(offset))
  }
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<EligibilityLogResponse[]>(String(url), {
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
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getEligibilityLogAction }

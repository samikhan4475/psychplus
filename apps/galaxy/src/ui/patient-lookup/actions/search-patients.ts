'use server'

import * as api from '@/api'
import { PatientProfile, Sort } from '@/types'
import { PATIENT_LOOKUP_TABLE_PAGE_SIZE } from '../constants'
import { transformResponseData } from '../transform'
import type { SearchPatientsData, SearchPatientsParams } from '../types'

interface SearchPatientRequesBody extends Partial<SearchPatientsParams> {
  page?: number
  sort?: Sort
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

const searchPatientsAction = async ({
  page = 1,
  sort,
  ...params
}: SearchPatientRequesBody): Promise<api.ActionResult<SearchPatientsData>> => {
  const offset = (page - 1) * PATIENT_LOOKUP_TABLE_PAGE_SIZE

  const url = new URL(api.SEARCH_PATIENTS_ENDPOINT)
  url.searchParams.append('limit', String(PATIENT_LOOKUP_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<PatientProfile[]>(url.toString(), {
    ...params,
    ...defaultPayload,
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
      patients: transformResponseData(response.data),
      total,
    },
  }
}

export { searchPatientsAction }

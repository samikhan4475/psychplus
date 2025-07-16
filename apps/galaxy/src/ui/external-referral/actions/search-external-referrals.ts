'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { EXTERNAL_REFERRAL_TABLE_PAGE_SIZE } from '../constants'
import type {
  Patient,
  SearchPatientsData,
  SearchPatientsParams,
} from '../types'

interface SearchPatientRequesBody extends Partial<SearchPatientsParams> {
  page?: number
  sort?: Sort
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeProvider: true,
  isIncludePatient: true,
  isIncludeLocation: true,
  isIncludeInitialAppointment: true,
  isIncludeAttachments: true,
}

const searchExternalReferralsAction = async ({
  page = 1,
  sort,
  ...params
}: SearchPatientRequesBody): Promise<api.ActionResult<SearchPatientsData>> => {
  const offset = (page - 1) * EXTERNAL_REFERRAL_TABLE_PAGE_SIZE

  const url = new URL(api.SEARCH_EXTERNAL_REFERRAL_PATIENTS_ENDPOINT)
  url.searchParams.append('limit', String(EXTERNAL_REFERRAL_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<Patient[]>(url.toString(), {
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
      patients: response.data,
      total,
    },
  }
}

export { searchExternalReferralsAction }

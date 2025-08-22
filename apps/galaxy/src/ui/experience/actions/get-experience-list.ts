'use server'

import * as api from '@/api'
import { Experience, ExperienceFilter, Sort } from '@/types'
import { EXPERIENCES_TABLE_PAGE_SIZE } from '../constants'
import type { GetExperiencesResponse } from '../types'

interface FetchExperienceListParams {
  payload?: Partial<ExperienceFilter>
  page?: number
  sort?: Sort
}

export const getExperienceListAction = async ({
  payload,
  page = 1,
  sort,
}: FetchExperienceListParams): Promise<
  api.ActionResult<GetExperiencesResponse>
> => {
  const offset = (page - 1) * EXPERIENCES_TABLE_PAGE_SIZE

  const url = new URL(api.GET_EXPERIENCE_LIST_ENDPOINT)
  url.searchParams.append('limit', String(EXPERIENCES_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<Experience[]>(`${url}`, {
    ...payload,
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeLocation: true,
    isIncludeEncounterTypes: true,
    isIncludePatientData: true,
    isIncludePatientFinancialData: true,
    isIncludeInsurancePolicies: true,
    isIncludeInsurancePlan: true,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      experiences: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

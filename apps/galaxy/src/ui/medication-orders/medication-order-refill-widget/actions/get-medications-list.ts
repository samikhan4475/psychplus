'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import type {
  MedicationRefill,
  MedicationRefillAPIRequest,
  MedicationRefillResponseList,
} from '../types'

interface GetMedicationListParams {
  payload?: MedicationRefillAPIRequest
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: false,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ['Active'],
  isIncludeStaff: true,
  isIncludeDrugList: true,
  isIncludeSignatureList: true,
  isIncludeDiagnosisList: true,
}

const getMedicationsListAction = async ({
  payload,
  page = 1,
  sort,
}: GetMedicationListParams): Promise<
  api.ActionResult<MedicationRefillResponseList>
> => {
  const offset = (page - 1) * 20

  const url = new URL(api.GET_MEDICATIONS_REFILL)
  url.searchParams.append('limit', String(20))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<MedicationRefill[]>(`${url}`, {
    ...defaultPayLoad,
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
    data: {
      refillRequests: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getMedicationsListAction }

'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { MedicationHistoryPayload, MedicationHistoryResponse } from '../types'

interface GetMedicationHistoryParams {
  payload?: MedicationHistoryPayload
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: false,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeCreateHistory: false,
}
const getMedicationHistoryListAction = async ({
  payload,
  page = 1,
  sort,
}: GetMedicationHistoryParams): Promise<
  api.ActionResult<MedicationHistoryResponse[]>
> => {
  const url = new URL(api.GET_MEDICATIONS_HISTORY(payload?.id ?? ''))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<MedicationHistoryResponse[]>(`${url}`, {
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
    data: response.data,
  }
}

export { getMedicationHistoryListAction }

'use server'

import * as api from '@/api'
import { DrugInfo } from '@/types'

const fetchDrugs = async (
  searchText: string,
): Promise<api.ActionResult<DrugInfo[]>> => {
  const payload = {
    searchText,
    searchType: 'StartsWith',
    searchTermTypeCodes: [0],
  }
  const response = await api.POST<DrugInfo[]>(api.GET_DRUGS, payload)
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

export { fetchDrugs }

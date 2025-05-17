'use server'

import * as api from '@/api'
import { SearchAllergiesResponse } from '../types'

enum SEARCH_TYPE {
  STARTS_WITH = 'startsWith',
}

enum PHONETIC_SEARCH {
  PHONETIC = 'Phonetic',
}

const defaultPayload = {
  searchType: SEARCH_TYPE.STARTS_WITH,
  phoneticSearch: PHONETIC_SEARCH.PHONETIC,
}

const searchAllergies = async (
  searchText: string,
): Promise<api.ActionResult<SearchAllergiesResponse[]>> => {
  const response = await api.POST<SearchAllergiesResponse[]>(
    api.POST_SEARCH_ALLERGIES,
    {
      ...defaultPayload,
      searchText,
    },
  )

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

export { searchAllergies }

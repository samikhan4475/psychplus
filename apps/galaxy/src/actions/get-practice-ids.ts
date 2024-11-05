'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'

enum recordStatuses {
  ACTIVE = 'Active',
}

const defaultPayloadPracticeList = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: [recordStatuses.ACTIVE],
}

interface PracticeList {
  id: string
  displayName: string
}

const getPracticeIdsAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const response = await api.POST<PracticeList[]>(
    api.GET_PRACTICE_IDS_LIST_ENDPOINT,
    defaultPayloadPracticeList,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPracticeIdsAction }

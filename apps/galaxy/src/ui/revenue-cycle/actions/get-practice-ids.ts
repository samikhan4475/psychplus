'use server'

import * as api from '@/api'
import { insurancePaymentRecordStatuses } from '../enums'
import { PracticeList } from '../types'

const defaultPayloadPracticeList = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: [insurancePaymentRecordStatuses.ACTIVE],
}

const getPracticeIdsAction = async (): Promise<
  api.ActionResult<PracticeList[]>
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

  return {
    state: 'success',
    data: response.data,
  }
}

export { getPracticeIdsAction }

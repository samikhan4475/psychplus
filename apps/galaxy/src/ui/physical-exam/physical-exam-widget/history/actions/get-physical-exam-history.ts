'use server'

import * as api from '@/api'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { PhysicalExamHistoryParams } from '../../types'

const getPhysicalExamHistoryAction = async (
  patientId: string,
  sectionName: QuickNoteSectionName,
  payload: PhysicalExamHistoryParams,
): Promise<api.ActionResult<QuickNoteHistory[]>> => {
  const response = await api.POST<QuickNoteHistory[]>(
    api.NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      patientId: Number(patientId),
      sectionName: [sectionName],
      ...payload,
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

export { getPhysicalExamHistoryAction }

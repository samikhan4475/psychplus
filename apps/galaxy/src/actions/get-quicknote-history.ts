'use server'

import * as api from '@/api'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HospitalInitialHistoryParams } from '../ui/hospital/hospital-initial-widget/history/types'

const getQuickNoteHistoryAction = async (
  patientId: string,
  sectionName: QuickNoteSectionName,
  payload: HospitalInitialHistoryParams,
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

export { getQuickNoteHistoryAction }

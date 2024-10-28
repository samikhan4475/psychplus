'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'

const getQuickNoteDetailAction = async (
  patientId: string,
  sectionNames: string[],
): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: sectionNames,
      isLatest: true,
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

export { getQuickNoteDetailAction }

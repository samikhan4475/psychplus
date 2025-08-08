'use server'

import * as api from '@/api'
import { QuickNoteDetailsPayload, QuickNoteSectionItem } from '@/types'

const getNoteAddons = async (
  patientId: string,
  sectionNames: string[],
  sectionItem?: string,
): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const payload: Partial<QuickNoteDetailsPayload> = {
    patientId: Number(patientId),
    sectionName: sectionNames,
    sectionItem,
  }

  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    payload,
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

export { getNoteAddons }

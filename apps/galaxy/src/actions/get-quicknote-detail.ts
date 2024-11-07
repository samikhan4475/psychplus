'use server'

import * as api from '@/api'
import { QuickNoteDetailsPayload, QuickNoteSectionItem } from '@/types'

const getQuickNoteDetailAction = async (
  patientId: string,
  sectionNames: string[],
  appointmentId?: string,
): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const payload: QuickNoteDetailsPayload = {
    patientId: Number(patientId),
    sectionName: sectionNames,
    isLatest: true,
  }

  if (appointmentId) payload.appointmentId = Number(appointmentId)

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

export { getQuickNoteDetailAction }

'use server'

import { cookies } from 'next/headers'
import * as api from '@/api'
import { QuickNoteDetailsPayload, QuickNoteSectionItem } from '@/types'

const getQuickNoteDetailAction = async (
  patientId: string,
  sectionNames: string[],
  isActualNote?: boolean,
  appointmentId?: string,
  isWithOutAppointmentId?: boolean,
): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const payload: QuickNoteDetailsPayload = {
    patientId: Number(patientId),
    sectionName: sectionNames,
    isLatest: true,
  }

  const cookieStore = await cookies()

  if (cookieStore.get('staff-id') && !isActualNote) {
    payload.historyCreatedByUserId = Number(cookieStore.get('staff-id')?.value)
    payload.isLatest = false
    payload.isCopyMyPrevious = true
  }

  if (appointmentId) payload.appointmentId = Number(appointmentId)

  if (isWithOutAppointmentId !== undefined) {
    payload.isWithAppointmentNull = isWithOutAppointmentId
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

export { getQuickNoteDetailAction }

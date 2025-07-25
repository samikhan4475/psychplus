'use client'

import * as api from '@/api/api.client'
import {
  NOTE_DETAILS_SAVE_ENDPOINT,
  NOTE_DETAILS_SAVE_WITH_APPOINTMENT_ID_ENDPOINT,
} from '@/api/endpoints'
import type { QuickNoteSectionItem } from '@/types'

interface SaveWidgetClientActionParams {
  patientId: string
  data: QuickNoteSectionItem[]
  appointmentId?: string
}

const saveWidgetClientAction = async ({
  patientId,
  data,
  appointmentId,
}: SaveWidgetClientActionParams): Promise<api.ActionResult<void>> => {
  const url = appointmentId
    ? NOTE_DETAILS_SAVE_WITH_APPOINTMENT_ID_ENDPOINT(patientId, appointmentId)
    : NOTE_DETAILS_SAVE_ENDPOINT(patientId)
  const response = appointmentId
    ? await api.POST<void>(url, data)
    : await api.PUT<void>(url, data)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { saveWidgetClientAction }

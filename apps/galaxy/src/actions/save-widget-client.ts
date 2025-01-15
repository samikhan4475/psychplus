'use client'

import * as api from '@/api/api.client'
import { NOTE_DETAILS_SAVE_ENDPOINT } from '@/api/endpoints'
import type { QuickNoteSectionItem } from '@/types'

interface SaveWidgetClientActionParams {
  patientId: string
  data: QuickNoteSectionItem[]
}

const saveWidgetClientAction = async ({
  patientId,
  data,
}: SaveWidgetClientActionParams): Promise<api.ActionResult<void>> => {
  const response = await api.PUT(NOTE_DETAILS_SAVE_ENDPOINT(patientId), data)

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

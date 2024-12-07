'use server'

import { cookies } from 'next/headers'
import * as api from '@/api'
import type { QuickNoteSectionItem } from '@/types'

interface SaveWidgetActionParams {
  patientId: string
  data: QuickNoteSectionItem[]
}

const saveWidgetAction = async ({
  patientId,
  data,
}: SaveWidgetActionParams): Promise<api.ActionResult<void>> => {
  const cookieStore = await cookies()

  if (cookieStore.get('staff-id')) cookieStore.delete('staff-id')

  const response = await api.PUT(
    api.NOTE_DETAILS_SAVE_ENDPOINT(patientId),
    data,
  )

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

export { saveWidgetAction }

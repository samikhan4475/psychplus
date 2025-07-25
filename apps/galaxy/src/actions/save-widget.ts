'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import * as api from '@/api'
import type { QuickNoteSectionItem } from '@/types'

interface SaveWidgetActionParams {
  patientId: string
  data: QuickNoteSectionItem[]
  tags?: string[]
  appointmentId?: string
}

const saveWidgetAction = async ({
  patientId,
  data,
  tags,
  appointmentId,
}: SaveWidgetActionParams): Promise<api.ActionResult<void>> => {
  const cookieStore = await cookies()

  if (cookieStore.get('staff-id')) cookieStore.delete('staff-id')

  const url = appointmentId
    ? api.NOTE_DETAILS_SAVE_WITH_APPOINTMENT_ID_ENDPOINT(
        patientId,
        appointmentId,
      )
    : api.NOTE_DETAILS_SAVE_ENDPOINT(patientId)

 const response =
    appointmentId
      ? await api.POST<void>(url, data)
      : await api.PUT<void>(url, data)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  if (tags?.length) {
    tags.forEach((tag) => {
      revalidateTag(tag)
    })
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { saveWidgetAction }

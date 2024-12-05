import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

const getQuicknoteSections = async (payload: {
  patientId: number
  sectionName: QuickNoteSectionName[]
}): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      isLatest: true,
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

export { getQuicknoteSections }

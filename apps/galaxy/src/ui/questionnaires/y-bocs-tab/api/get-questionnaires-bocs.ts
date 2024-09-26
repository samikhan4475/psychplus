'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesYBocsParams {
  patientId: string
}

interface GetQuestionnairesYBocsResponse {
  questionnairesYBocsData: QuickNoteSectionItem[]
}

const getQuestionnairesYBocs = async ({
  patientId,
}: GetQuestionnairesYBocsParams): Promise<
  api.ActionResult<GetQuestionnairesYBocsResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionYbcos],
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
    data: {
      questionnairesYBocsData: response.data,
    },
  }
}

export { getQuestionnairesYBocs }

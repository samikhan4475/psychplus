'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesDashboardParams {
  patientId: string
}

interface GetQuestionnairesDashboardResponse {
  questionnairesDashboardData: QuickNoteSectionItem[]
}

const getQuestionnairesDashboard = async ({
  patientId,
}: GetQuestionnairesDashboardParams): Promise<
  api.ActionResult<GetQuestionnairesDashboardResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionDashboard],
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
      questionnairesDashboardData: response.data,
    },
  }
}

export { getQuestionnairesDashboard }

'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesAimsParams {
  patientId: string
}

interface GetQuestionnairesAimsResponse {
  questionnairesAimsData: QuickNoteSectionItem[]
}

const getQuestionnairesAims = async ({
  patientId,
}: GetQuestionnairesAimsParams): Promise<
  api.ActionResult<GetQuestionnairesAimsResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionAims],
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
      questionnairesAimsData: response.data,
    },
  }
}

export { getQuestionnairesAims }

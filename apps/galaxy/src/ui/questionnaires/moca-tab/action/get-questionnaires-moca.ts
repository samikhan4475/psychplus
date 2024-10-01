'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesMocaParams {
  patientId: string
}

interface GetQuestionnairesMocaResponse {
  questionnairesMocaData: QuickNoteSectionItem[]
}

const getQuestionnairesMoca = async ({
  patientId,
}: GetQuestionnairesMocaParams): Promise<
  api.ActionResult<GetQuestionnairesMocaResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionMoca],
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
      questionnairesMocaData: response.data,
    },
  }
}

export { getQuestionnairesMoca }

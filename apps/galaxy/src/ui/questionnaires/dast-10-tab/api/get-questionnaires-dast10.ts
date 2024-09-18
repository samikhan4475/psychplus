import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesDast10Params {
  patientId: string
}

interface GetQuestionnairesDast10PResponse {
  questionnairesDast10Data: QuickNoteSectionItem[]
}

const getQuestionnairesDast10 = async ({
  patientId,
}: GetQuestionnairesDast10Params): Promise<
  api.ActionResult<GetQuestionnairesDast10PResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionDast10],
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
      questionnairesDast10Data: response.data,
    },
  }
}

export { getQuestionnairesDast10 }

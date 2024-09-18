import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesPcl5Params {
  patientId: string
}

interface GetQuestionnairesPcl5PResponse {
  questionnairesPcl5Data: QuickNoteSectionItem[]
}

const getQuestionnairesPcl5 = async ({
  patientId,
}: GetQuestionnairesPcl5Params): Promise<
  api.ActionResult<GetQuestionnairesPcl5PResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionPcl5],
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
      questionnairesPcl5Data: response.data,
    },
  }
}

export { getQuestionnairesPcl5 }

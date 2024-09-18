import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesGad7Params {
  patientId: string
}

interface GetQuestionnairesGad7PResponse {
  questionnairesGad7Data: QuickNoteSectionItem[]
}

const getQuestionnairesGad7 = async ({
  patientId,
}: GetQuestionnairesGad7Params): Promise<
  api.ActionResult<GetQuestionnairesGad7PResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionGad7],
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
      questionnairesGad7Data: response.data,
    },
  }
}

export { getQuestionnairesGad7 }

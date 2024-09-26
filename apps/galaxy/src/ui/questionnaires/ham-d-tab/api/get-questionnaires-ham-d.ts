import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesHamDParams {
  patientId: string
}

interface GetQuestionnairesHamDResponse {
  questionnairesHamDData: QuickNoteSectionItem[]
}

const getQuestionnairesHamD = async ({
  patientId,
}: GetQuestionnairesHamDParams): Promise<
  api.ActionResult<GetQuestionnairesHamDResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionHamD],
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
      questionnairesHamDData: response.data,
    },
  }
}

export { getQuestionnairesHamD }

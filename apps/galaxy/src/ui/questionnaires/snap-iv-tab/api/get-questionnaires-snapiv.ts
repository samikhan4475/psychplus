'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesSnapIvParams {
  patientId: string
}

interface GetQuestionnairesSnapIvResponse {
  questionnairesSnapIvData: QuickNoteSectionItem[]
}

const getQuestionnairesSnapIv = async ({
  patientId,
}: GetQuestionnairesSnapIvParams): Promise<
  api.ActionResult<GetQuestionnairesSnapIvResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionSnapIV],
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
      questionnairesSnapIvData: response.data,
    },
  }
}

export { getQuestionnairesSnapIv }

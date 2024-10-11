'use server'

import * as api from '@/api'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesHistoryParam {
  patientId: string
  sectionName: QuickNoteSectionName
}

interface GetQuestionnairesResponse {
  historyData: QuickNoteHistory[]
}

const getQuestionnairesHistory = async ({
  patientId,
  sectionName,
}: GetQuestionnairesHistoryParam): Promise<
  api.ActionResult<GetQuestionnairesResponse>
> => {
  const response = await api.POST<QuickNoteHistory[]>(
    api.NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      patientId: Number(patientId),
      sectionName: [sectionName],
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  // calculating scores for eact history
  const historyData = response.data.map((item) => {
    const totalScore = item.data.reduce((total, item) => {
      return total + parseInt(item.sectionItemValue, 10)
    }, 0)

    return {
      ...item,
      totalScore: totalScore.toString(),
    }
  })

  return {
    state: 'success',
    data: {
      historyData: historyData,
    },
  }
}

export { getQuestionnairesHistory }

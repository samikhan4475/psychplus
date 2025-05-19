'use server'

import * as api from '@/api'
import { NOTE_DETAILS_HISTORY_ENDPOINT } from '@/api'
import { QuickNoteHistory } from '@/types'

interface GetQuestionnairesHistoriesParams {
  patientId: string
  sectionNames: string[]
}

const getQuestionnairesHistoriesAction = async ({
  patientId,
  sectionNames,
}: GetQuestionnairesHistoriesParams): Promise<
  api.ActionResult<QuickNoteHistory[]>
> => {
  const response = await api.POST<QuickNoteHistory[]>(
    NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: sectionNames,
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
    data: response.data,
  }
}

export { getQuestionnairesHistoriesAction }

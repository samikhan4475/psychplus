'use server'

import * as api from '@/api'
import { QuickNoteHistory } from '@/types'
import { HISTORIES_SECTIONS } from '../../constants'

interface GetQuestionnairesHistoriesParams {
  patientId: string
}

const getQuestionnairesHistories = async ({
  patientId,
}: GetQuestionnairesHistoriesParams): Promise<
  api.ActionResult<QuickNoteHistory[]>
> => {
  const response = await api.POST<QuickNoteHistory[]>(
    api.NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: HISTORIES_SECTIONS,
      // isLatest: true,
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

export { getQuestionnairesHistories }

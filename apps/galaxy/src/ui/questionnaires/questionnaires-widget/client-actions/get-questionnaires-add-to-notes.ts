'use client'

import * as api from '@/api/api.client'
import { NOTE_DETAILS_HISTORY_ENDPOINT } from '@/api/endpoints'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesHistoriesParams {
  patientId: string
}

const getQuestionnairesHistories = async ({
  patientId,
}: GetQuestionnairesHistoriesParams): Promise<
  api.ActionResult<QuickNoteHistory[]>
> => {
  const historiesSections = [
    QuickNoteSectionName.QuickNoteSectionPhq9,
    QuickNoteSectionName.QuickNoteSectionGad7,
    QuickNoteSectionName.QuickNoteSectionSnapIV,
    QuickNoteSectionName.QuickNoteSectionDast10,
    QuickNoteSectionName.QuickNoteSectionAudit,
    QuickNoteSectionName.QuickNoteSectionHamD,
    QuickNoteSectionName.QuickNoteSectionYbcos,
    QuickNoteSectionName.QuickNoteSectionMoca,
    QuickNoteSectionName.QuickNoteSectionAims,
    QuickNoteSectionName.QuickNoteSectionPcl5,
    QuickNoteSectionName.QuickNoteSectionCssrs,
    QuickNoteSectionName.QuickNoteSectionPsc17,
    QuickNoteSectionName.QuickNoteSectionCopsR,
  ]

  const response = await api.POST<QuickNoteHistory[]>(
    NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: historiesSections,
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

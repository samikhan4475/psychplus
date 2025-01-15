'use client'

import * as api from '@/api/api.client'
import { NOTE_DETAILS_HISTORY_ENDPOINT } from '@/api/endpoints'
import { QuickNoteHistory } from '@/types'
import {
  questionnairesAddToNotesSection,
  QuickNoteSectionName,
} from '@/ui/quicknotes/constants'

interface GetQuestionnairesAddToNotesParams {
  patientId: string
}

const getQuestionnairesAddToNotes = async ({
  patientId,
}: GetQuestionnairesAddToNotesParams): Promise<
  api.ActionResult<QuickNoteHistory[]>
> => {
  const response = await api.POST<QuickNoteHistory[]>(
    NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [
        QuickNoteSectionName.QuickNoteSectionDashboard,
        ...questionnairesAddToNotesSection,
      ],
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

export { getQuestionnairesAddToNotes }

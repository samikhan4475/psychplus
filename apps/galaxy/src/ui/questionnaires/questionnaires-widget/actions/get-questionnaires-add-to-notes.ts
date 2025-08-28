'use server'

import * as api from '@/api'
import { QuickNoteHistory } from '@/types'
import {
  questionnairesAddToNotesSection,
  QuickNoteSectionName,
} from '@/ui/quicknotes/constants'

interface GetQuestionnairesAddToNotesParams {
  patientId: string
  appointmentId?: string
}

const getQuestionnairesAddToNotes = async ({
  patientId,
  appointmentId
}: GetQuestionnairesAddToNotesParams): Promise<
  api.ActionResult<QuickNoteHistory[]>
> => {
  const response = await api.POST<QuickNoteHistory[]>(
    api.NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      patientId: Number(patientId),
      ...(appointmentId && { appointmentId }),
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

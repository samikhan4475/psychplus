'use server'

import * as api from '@/api'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesAddToNotesParams {
  patientId: string
}

const addToNotesSections = [
  QuickNoteSectionName.QuickNoteSectionDashboard,
  QuickNoteSectionName.QuestionnaireActualNoteView,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionPhq9}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionGad7}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionSnapIV}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionDast10}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionAudit}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionHamD}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionYbcos}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionMoca}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionAims}`,
  `${QuickNoteSectionName.AddToNoteQuestionnaire}-${QuickNoteSectionName.QuickNoteSectionPcl5}`,
]

const getQuestionnairesAddToNotes = async ({
  patientId,
}: GetQuestionnairesAddToNotesParams): Promise<
  api.ActionResult<QuickNoteHistory[]>
> => {
  const response = await api.POST<QuickNoteHistory[]>(
    api.NOTE_DETAILS_HISTORY_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: addToNotesSections,
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

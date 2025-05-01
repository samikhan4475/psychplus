'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NoteSectionItem } from '@/features/note/types'

const addNoteDetailsUnauthenticated = async (
  noteDetails: NoteSectionItem[],
  questionnaireType: string,
): Promise<ActionResult<NoteSectionItem[]>> => {
  const pid = noteDetails?.[0].pid
  const result = await api.POST<NoteSectionItem[]>(
    `${API_URL}/api/patients/${pid}/questionnaires/${questionnaireType}`,
    noteDetails?.length ? [...noteDetails] : [],
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { addNoteDetailsUnauthenticated }

'use server'

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NoteSectionItem } from '../types'

const addNoteDetails = async (
  noteDetails?: NoteSectionItem[],
): Promise<ActionResult<NoteSectionItem[]>> => {
  const result = await api.POST<NoteSectionItem[]>(
    `${API_URL}/api/patients/self/notedetails`,
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

export { addNoteDetails }

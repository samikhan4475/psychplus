import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { type ActionResult } from '@psychplus-v2/api'
import { type CreateJournalRequest, type CreateJournalResponse } from '../types'

const createJournal = async (
  patientId: number,
  payload: Omit<CreateJournalRequest, 'patientId'>,
): Promise<ActionResult<CreateJournalResponse>> => {
  const result = await api.POST<CreateJournalResponse>(
    `${API_URL}/api/patients/${patientId}/moodjournals`,
    {
      ...payload,
      patientId,
    },
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

export { createJournal } 
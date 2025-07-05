import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { type ActionResult } from '@psychplus-v2/api'
import { type UpdateJournalRequest, type UpdateJournalResponse } from '../types'

const updateJournal = async (
  patientId: number,
  journalId: string,
  payload: Omit<UpdateJournalRequest, 'patientId' | 'journalId'>,
): Promise<ActionResult<UpdateJournalResponse>> => {
  const url = `${API_URL}/api/patients/${patientId}/moodjournals/${journalId}`

  const result = await api.PUT<UpdateJournalResponse>(url, {
    ...payload,
    patientId,
    journalId,
  })

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

export { updateJournal } 
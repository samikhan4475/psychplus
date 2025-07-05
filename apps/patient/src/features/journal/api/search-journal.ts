import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { type ActionResult } from '@psychplus-v2/api'
import { type SearchJournalRequest, type SearchJournalResponse } from '../types'

const searchJournal = async (
  patientId: number,
  payload: Omit<SearchJournalRequest, 'patientId'>,
): Promise<ActionResult<SearchJournalResponse[]>> => {
  const url = new URL(`${API_URL}/api/patients/${patientId}/moodjournals/actions/search`)
  url.searchParams.append('offset', '0')
  url.searchParams.append('limit', '0')
  url.searchParams.append('orderBy', 'createdon desc')

  const result = await api.POST<SearchJournalResponse[]>(url.toString(), {
    ...payload,
    patientId,
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

export { searchJournal } 
'use server'

import { type ActionResult } from '@psychplus-v2/api'
import { searchJournal } from '../api/search-journal'
import { type SearchJournalRequest, type SearchJournalResponse } from '../types'
import { RecordStatus } from '@/types/feature-flag'

const searchJournalAction = async (
  patientId: number,
  payload: Omit<SearchJournalRequest, 'patientId'>,
): Promise<ActionResult<SearchJournalResponse[]>> => {
  const defaultPayload = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
    recordStatuses: [RecordStatus.ACTIVE],
    isIncludePatient: true,
    isIncludeAttachments: true,
    isIncludeNotes: true,
  }
  return searchJournal(patientId, { ...defaultPayload, ...payload })
}

export { searchJournalAction }

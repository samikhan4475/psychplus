'use server'

import { updateJournal } from '../api/update-journal'
import { type UpdateJournalRequest } from '../types'

const updateJournalAction = async (
  patientId: number,
  journalId: string,
  payload: Omit<UpdateJournalRequest, 'patientId' | 'journalId'>,
) => {
  return updateJournal(patientId, journalId, payload)
}

export { updateJournalAction } 
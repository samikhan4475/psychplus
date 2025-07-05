'use server'

import { type ActionResult } from '@psychplus-v2/api'
import { createJournal } from '../api/create-journal'
import { type CreateJournalRequest, type CreateJournalResponse } from '../types'

const createJournalAction = async (
  patientId: number,
  payload: Omit<CreateJournalRequest, 'patientId'>,
): Promise<ActionResult<CreateJournalResponse>> => {
  return createJournal(patientId, payload)
}

export { createJournalAction } 
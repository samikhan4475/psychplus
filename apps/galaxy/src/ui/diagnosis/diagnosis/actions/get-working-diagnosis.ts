'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuicknotesWorkingDiagnosisParams {
  patientId: string
}

const getQuickNotesWorkingDiagnosis = async ({
  patientId,
}: GetQuicknotesWorkingDiagnosisParams): Promise<
  api.ActionResult<QuickNoteSectionItem[]>
> => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionDiagnosis,
  ])

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

export { getQuickNotesWorkingDiagnosis }

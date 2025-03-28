'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuicknotesWorkingDischargeDiagnosisParams {
  patientId: string
  appointmentId: string
}

const getQuickNotesWorkingDischargeDiagnosis = async ({
  patientId,
  appointmentId,
}: GetQuicknotesWorkingDischargeDiagnosisParams): Promise<
  api.ActionResult<QuickNoteSectionItem[]>
> => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.QuicknoteSectionWorkingDischargeDiagnosis],
    undefined,
    appointmentId,
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

export { getQuickNotesWorkingDischargeDiagnosis }

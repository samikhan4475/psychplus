'use server'

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
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionDiagnosis],
      isLatest: true,
    },
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

export { getQuickNotesWorkingDiagnosis }

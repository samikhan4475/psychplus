'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetHistoryParams {
  patientId: string
}

const getHistoryAction = async ({
  patientId,
}: GetHistoryParams): Promise<api.ActionResult<QuickNoteSectionItem[]>> => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionPastPsychHx,
    QuickNoteSectionName.QuickNoteSectionFamilyPsychHx,
    QuickNoteSectionName.QuickNoteSectionPastMedicalHx,
    QuickNoteSectionName.QuickNoteSectionSocialHx,
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
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

export { getHistoryAction }

'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'

interface GetAssessmentPlanParams {
  patientId: string
  sectionName: string
}

const getAssessmentPlanAction = async ({
  patientId,
  sectionName,
}: GetAssessmentPlanParams): Promise<
  api.ActionResult<QuickNoteSectionItem[]>
> => {
  const response = await getQuickNoteDetailAction(patientId, [sectionName])

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

export { getAssessmentPlanAction }

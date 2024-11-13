'use server'

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
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [sectionName],
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

export { getAssessmentPlanAction }

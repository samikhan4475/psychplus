'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'

interface GetUrineDrugScreenParams {
  patientId: string
  sectionName: string
}

const getUrineDrugScreenAction = async ({
  patientId,
  sectionName,
}: GetUrineDrugScreenParams): Promise<
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

export { getUrineDrugScreenAction }

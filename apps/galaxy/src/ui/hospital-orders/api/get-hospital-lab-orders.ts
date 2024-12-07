'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuicknotesHospitalParams {
  patientId: string
}

interface GetQuicknoteHospitalResponse {
  quicknotesHospitalLabOrdersData: QuickNoteSectionItem[]
}

const getQuickNotesHospitalLabOrders = async ({
  patientId,
}: GetQuicknotesHospitalParams): Promise<
  api.ActionResult<GetQuicknoteHospitalResponse>
> => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionHospitalOrders,
  ])

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      quicknotesHospitalLabOrdersData: response.data,
    },
  }
}

export { getQuickNotesHospitalLabOrders }

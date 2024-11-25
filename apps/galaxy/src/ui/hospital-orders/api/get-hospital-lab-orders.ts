'use server'

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
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionHospitalOrders],
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
    data: {
      quicknotesHospitalLabOrdersData: response.data,
    },
  }
}

export { getQuickNotesHospitalLabOrders }

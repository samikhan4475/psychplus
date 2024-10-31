'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetProcedureEctParams {
  patientId: string
}

interface GetProcedureEctResponse {
  procedureEctData: QuickNoteSectionItem[]
}

const getProcedureEct = async ({
  patientId,
}: GetProcedureEctParams): Promise<
  api.ActionResult<GetProcedureEctResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuicknoteSectionProcedureEtcTab],
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
      procedureEctData: response.data,
    },
  }
}

export { getProcedureEct }

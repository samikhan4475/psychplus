'use server'

import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetProcedureTmsParams {
  patientId: string
}



const getProcedureTms = async ({
  patientId,
}: GetProcedureTmsParams): Promise<
  api.ActionResult<QuickNoteSectionItem[]>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.ProcedureTMS],
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
    data: response.data
  }
}

export { getProcedureTms }

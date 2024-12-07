'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
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
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.ProcedureTMS,
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

export { getProcedureTms }

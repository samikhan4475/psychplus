'use server'

import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
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
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuicknoteSectionProcedureEtcTab,
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
      procedureEctData: response.data,
    },
  }
}

export { getProcedureEct }

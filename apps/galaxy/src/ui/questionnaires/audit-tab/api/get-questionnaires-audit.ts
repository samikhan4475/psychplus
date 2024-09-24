import * as api from '@/api'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface GetQuestionnairesAuditParams {
  patientId: string
}

interface GetQuestionnairesAuditResponse {
  questionnairesAuditData: QuickNoteSectionItem[]
}

const getQuestionnairesAudit = async ({
  patientId,
}: GetQuestionnairesAuditParams): Promise<
  api.ActionResult<GetQuestionnairesAuditResponse>
> => {
  const response = await api.POST<QuickNoteSectionItem[]>(
    api.NOTE_DETAILS_SEARCH_ENDPOINT,
    {
      patientId: Number(patientId),
      sectionName: [QuickNoteSectionName.QuickNoteSectionAudit],
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
      questionnairesAuditData: response.data,
    },
  }
}

export { getQuestionnairesAudit }

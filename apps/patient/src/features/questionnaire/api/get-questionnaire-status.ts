import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '../../note/types'

interface QuestionnaireStatusPayload {
  pId: number
  appId?: number
  sectionName: NoteSectionName[]
}

const getQuestionnaireStatus = async (
  questionnaireDetails: QuestionnaireStatusPayload,
): Promise<ActionResult<NoteSectionItem[]>> => {
  const { pId, ...rest } = questionnaireDetails
  const result = await api.POST<NoteSectionItem[]>(
    `${API_URL}/api/patients/${pId}/questionnaires/search/actions/exists`,
    {
      ...rest,
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { getQuestionnaireStatus }

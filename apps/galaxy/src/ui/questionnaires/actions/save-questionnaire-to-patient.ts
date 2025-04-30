'use client'

import * as api from '@/api/api.client'
import { SEND_QUESTIONNAIRE_TO_PATIENT } from '@/api/endpoints'
import { QuestionnaireType } from '@/constants'

interface SendQuestionnaireToPatientClientActionClientActionParams {
  patientId: string
  questionnaireType: QuestionnaireType
}

const sendQuestionnaireToPatientClientAction = async ({
  patientId,
  questionnaireType,
}: SendQuestionnaireToPatientClientActionClientActionParams): Promise<
  api.ActionResult<void>
> => {
  const response = await api.POST(
    SEND_QUESTIONNAIRE_TO_PATIENT(patientId, questionnaireType),
    {},
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: undefined,
  }
}

export { sendQuestionnaireToPatientClientAction }

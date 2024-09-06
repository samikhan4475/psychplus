import * as api from '@/api'
import type {
  GetQuestionnairesDashboardResponse,
  QuestionnairesDashboard,
} from '../types'

interface GetQuestionnairesDashboardParams {
  patientId: string
}

const getQuestionnairesDashboardAction = async ({
  patientId,
}: GetQuestionnairesDashboardParams): Promise<
  api.ActionResult<GetQuestionnairesDashboardResponse>
> => {
  const response = await mockQuestionnairesDashboard()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      questionnairesDashboardData: response.data,
    },
  }
}

const mockQuestionnairesDashboard = async (): Promise<
  api.NetworkResult<QuestionnairesDashboard[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            testName: 'Patient Health Questionnaire (PHQ-9)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Generalized Anxiety Disorder (GAD-7)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Swanson, Nolan and Pelham (SNAP-IV)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Posttraumatic Stress Disorder Checklist (PCL-5)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Yale-Brown Obsessive Compulsive (Y-BOCS)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Abnormal Involuntary Movement Scale (AIMS)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Alcohol Use Disorders Identification Test (AUDIT)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Drug Abuse Screening Test (DAST-10)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Montreal Cognitive Assessment (MoCA)',
            addToPreVisitAssessment: false,
          },
          {
            testName: 'Hamilton Depression Rating Scale (HAM-D)',
            addToPreVisitAssessment: false,
          },
        ],
      })
    }, 2000)
  })
}

export { getQuestionnairesDashboardAction }

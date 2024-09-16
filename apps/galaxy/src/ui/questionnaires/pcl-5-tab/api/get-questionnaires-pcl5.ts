import * as api from '@/api'
import { QuestionnairesData } from '../../shared/questionnaires-form'

interface GetQuestionnairesPcl5Params {
  patientId: string
}

interface GetQuestionnairesPcl5PResponse {
  questionnairesPcl5Data: QuestionnairesData[]
}

const getQuestionnairesPcl5 = async ({
  patientId,
}: GetQuestionnairesPcl5Params): Promise<
  api.ActionResult<GetQuestionnairesPcl5PResponse>
> => {
  const response = await mockQuestionnairesPcl5()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      questionnairesPcl5Data: response.data,
    },
  }
}

const mockQuestionnairesPcl5 = async (): Promise<
  api.NetworkResult<QuestionnairesData[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          'Repeated, disturbing, and unwanted memories of the stressful experience?',
          'Suddenly feeling or acting as if the stressful experience were actually happening again (as if you were actually back there reliving it)?',
          'Feeling very upset when something reminded you of the stressful experience?',
          'Having strong physical reactions when something reminded you of the stressful experience (for example, heart pounding, sweating)?',
          'Avoiding memories, thoughts, or feelings related to the stressful experience?',
          'Avoiding external reminders of the stressful experience (for example, people, places, conversations, activities, objects, or situations)?',
          'Trouble remembering important parts of the stressful experience?',
          'Having strong negative beliefs about yourself, other people, or the world (for example, having thoughts such as: I am bad, there is something seriously wrong with me, no one can be trusted, the world is completely dangerous)?',
          'Blaming yourself or someone else for the stressful experience or what happened after it?',
          'Having strong negative feelings such as fear, horror, anger, guilt, or shame?',
          'Loss of interest in activities that you used to enjoy?',
          'Trouble experiencing positive feelings (for example, being unable to feel happiness or have loving feelings for people close to you)?',
          'Irritable behaviour, angry outbursts, or acting aggressively?',
          'Taking too many risks or doing things that could cause you harm?',
          'Being “superalert” or watchful or on guard?',
          'Feeling jumpy or easily startled?',
          'Having difficulty concentrating?',
          'Trouble falling or staying asleep?',
        ].map((question) => ({
          question,
          selectedValue: 1,
          options: [
            { label: '0', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
          ],
        })),
      })
    }, 2000)
  })
}

export { getQuestionnairesPcl5 }

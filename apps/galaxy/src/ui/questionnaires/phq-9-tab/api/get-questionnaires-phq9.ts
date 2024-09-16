import * as api from '@/api'
import { QuestionnairesData } from '../../shared/questionnaires-form'

interface GetQuestionnairesPhq9Params {
  patientId: string
}

interface GetQuestionnairesPhq9PResponse {
  questionnairesPhq9Data: QuestionnairesData[]
}

const getQuestionnairesPhq9 = async ({
  patientId,
}: GetQuestionnairesPhq9Params): Promise<
  api.ActionResult<GetQuestionnairesPhq9PResponse>
> => {
  const response = await mockQuestionnairesPhq9()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      questionnairesPhq9Data: response.data,
    },
  }
}

const mockQuestionnairesPhq9 = async (): Promise<
  api.NetworkResult<QuestionnairesData[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          'Little interest or pleasure in doing things',
          'Feeling down, depressed, or hopeless',
          'Trouble falling or staying asleep, or sleeping too much',
          'Feeling tired or having little energy',
          'Poor appetite or overacting',
          'Feeling bad about yourself or that you are a failure or have let yourself or your family down',
          'Trouble concentrating on things, such as reading the newspaper or watching television',
          'Moving or speaking so slowly that other people could have noticed? Or the opposite being so fidgety or restless that you have been moving around a lot more than usual',
          'Thoughts that you would be better off dead or of hurting yourself in some way',
        ].map((question) => ({
          question,
          selectedValue: 1,
          options: [
            { label: '0', value: 0 },
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
          ],
        })),
      })
    }, 2000)
  })
}

export { getQuestionnairesPhq9 }

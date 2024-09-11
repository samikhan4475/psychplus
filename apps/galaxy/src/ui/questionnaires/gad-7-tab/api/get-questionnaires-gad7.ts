import * as api from '@/api'
import { QuestionnairesData } from '../../shared/questionnaires-form'

interface GetQuestionnairesGad7Params {
  patientId: string
}

interface GetQuestionnairesGad7PResponse {
  questionnairesGad7Data: QuestionnairesData[]
}

const getQuestionnairesGad7 = async ({
  patientId,
}: GetQuestionnairesGad7Params): Promise<
  api.ActionResult<GetQuestionnairesGad7PResponse>
> => {
  const response = await mockQuestionnairesGad7()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      questionnairesGad7Data: response.data,
    },
  }
}

const mockQuestionnairesGad7 = async (): Promise<
  api.NetworkResult<QuestionnairesData[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            question: 'Feeling nervous, anxious or on edge',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
          {
            question: 'Not being able to stop or control worrying',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
          {
            question: 'Worrying too much about different things',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
          {
            question: 'Trouble relaxing',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
          {
            question: 'Being so restless that it is hard to sit still',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
          {
            question: 'Becoming easily annoyed or irritable',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
          {
            question: 'Feeling afraid as if something awful might happen',
            selectedValue: 1,
            options: [
              { label: '0', value: 0 },
              { label: '1', value: 1 },
              { label: '2', value: 2 },
              { label: '3', value: 3 },
            ],
          },
        ],
      })
    }, 2000)
  })
}

export { getQuestionnairesGad7 }

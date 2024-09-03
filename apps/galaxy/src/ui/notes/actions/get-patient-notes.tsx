import * as api from '@/api'
import type { GetPatientNotesResponse, PatientNotes } from '../types'

interface GetPatientNotesParams {
  patientId: string
}

const getPatientNotesAction = async ({
  patientId,
}: GetPatientNotesParams): Promise<
  api.ActionResult<GetPatientNotesResponse>
> => {
  const response = await mockFetchPatientAllergies()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      notes: response.data,
    },
  }
}

const mockFetchPatientAllergies = async (): Promise<
  api.NetworkResult<PatientNotes[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [...Array(100)].map(() => ({
          date: '22/06/24',
          time: '13:38',
          authors: 'John Smith, MD',
          visitType: 'Est Pt, Outpatient, In-person',
          visitTitle: 'Psychiatric Evaluation',
          location: 'Test Clinic',
          service: 'Therapy',
          state: 'US',
          practice: 'Psychiatry',
          organization: 'Test Org',
          status: 'Signed',
        })),
      })
    }, 2000)
  })
}

export { getPatientNotesAction }

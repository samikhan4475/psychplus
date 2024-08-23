import * as api from '@/api'
import { PATIENT_ALLERGIES_TABLE_PAGE_SIZE } from '../constants'
import type { GetPatientAllergiesResponse, PatientAllergy } from '../types'

interface GetPatientAllergiesParams {
  patientId: string
  page?: number
}

const getPatientAllergiesAction = async ({
  patientId,
  page = 1,
}: GetPatientAllergiesParams): Promise<
  api.ActionResult<GetPatientAllergiesResponse>
> => {
  const offset = (page - 1) * PATIENT_ALLERGIES_TABLE_PAGE_SIZE

  const response = await mockFetchPatientAllergies()

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: {
      allergies: response.data,
      total,
    },
  }
}

const mockFetchPatientAllergies = async (): Promise<
  api.NetworkResult<PatientAllergy[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            type: 'Ingredient',
            name: 'Shellfish',
            reaction: 'Cough',
            severity: 'Mild',
            status: 'active',
            observationDate: '03/21/24',
            endDate: '03/21/24',
            notes: '',
            addToNote: false,
          },
          {
            type: 'Ingredient',
            name: 'Peanuts',
            reaction: 'Hives',
            severity: 'Moderate',
            status: 'active',
            observationDate: '03/21/24',
            endDate: '03/21/24',
            notes: 'these are some notes about the peanut allergy',
            addToNote: false,
          },
          {
            type: 'Drug Class',
            name: 'penicillin',
            reaction: 'Anaphylaxis',
            severity: 'Severe',
            status: 'active',
            observationDate: '03/21/24',
            endDate: '03/21/24',
            notes: '',
            addToNote: false,
          },
          {
            type: 'Substance',
            name: 'Alcohol',
            reaction: 'Cough',
            severity: 'Mild',
            status: 'active',
            observationDate: '03/21/24',
            endDate: '03/21/24',
            notes: '',
            addToNote: false,
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientAllergiesAction }

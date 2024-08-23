import * as api from '@/api'
import { PATIENT_VITALS_TABLE_PAGE_SIZE } from '../constants'
import type { GetPatientVitalsResponse, PatientVital } from '../types'

interface GetPatientVitalsParams {
  patientId: string
  page?: number
}

const getPatientVitalsAction = async ({
  patientId,
  page = 1,
}: GetPatientVitalsParams): Promise<
  api.ActionResult<GetPatientVitalsResponse>
> => {
  const offset = (page - 1) * PATIENT_VITALS_TABLE_PAGE_SIZE

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
      vitals: response.data,
      total,
    },
  }
}

const mockFetchPatientAllergies = async (): Promise<
  api.NetworkResult<PatientVital[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            dateTime: '03/21/24 00:00',
            bp: '120/80 mmHg',
            hr: '60 to 100 bpm',
            rr: '60 to 100 bpm',
            temp: '98.6',
            weight: '45 kg',
            height: '5.8',
            hc: '22',
            pulseOximetry: '97',
            oxygenConcentration: '2',
            bmi: '22',
            status: 'active',
            addToNote: false,
          },
          {
            dateTime: '03/21/24 00:00',
            bp: '120/80 mmHg',
            hr: '60 to 100 bpm',
            rr: '60 to 100 bpm',
            temp: '98.6',
            weight: '45 kg',
            height: '5.8',
            hc: '22',
            pulseOximetry: '97',
            oxygenConcentration: '2',
            bmi: '22',
            status: 'active',
            addToNote: false,
          },
          {
            dateTime: '03/21/24 00:00',
            bp: '120/80 mmHg',
            hr: '60 to 100 bpm',
            rr: '60 to 100 bpm',
            temp: '98.6',
            weight: '45 kg',
            height: '5.8',
            hc: '22',
            pulseOximetry: '97',
            oxygenConcentration: '2',
            bmi: '22',
            status: 'active',
            addToNote: false,
          },
          {
            dateTime: '03/21/24 00:00',
            bp: '120/80 mmHg',
            hr: '60 to 100 bpm',
            rr: '60 to 100 bpm',
            temp: '98.6',
            weight: '45 kg',
            height: '5.8',
            hc: '22',
            pulseOximetry: '97',
            oxygenConcentration: '2',
            bmi: '22',
            status: 'active',
            addToNote: false,
          },
          {
            dateTime: '03/21/24 00:00',
            bp: '120/80 mmHg',
            hr: '60 to 100 bpm',
            rr: '60 to 100 bpm',
            temp: '98.6',
            weight: '45 kg',
            height: '5.8',
            hc: '22',
            pulseOximetry: '97',
            oxygenConcentration: '2',
            bmi: '22',
            status: 'inactive',
            addToNote: false,
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientVitalsAction }

import * as api from '@/api'
import { PATIENT_MEDICATIONS_TABLE_PAGE_SIZE } from '../constants'
import type { GetPatientMedicationsResponse, PatientMedication } from '../types'

interface GetPatientAllergiesParams {
  patientId: string
  page?: number
}

const getPatientMedicationsAction = async ({
  patientId,
  page = 1,
}: GetPatientAllergiesParams): Promise<
  api.ActionResult<GetPatientMedicationsResponse>
> => {
  const offset = (page - 1) * PATIENT_MEDICATIONS_TABLE_PAGE_SIZE

  const response = await mockFetchPatientMedications()

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
      medications: response.data,
      total,
    },
  }
}

const mockFetchPatientMedications = async (): Promise<
  api.NetworkResult<PatientMedication[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        headers: new Headers({}),
        state: 'success',
        data: [
          {
            type: 'Current',
            drugName: 'Lisinopril',
            strength: '10 mg',
            directions: 'Take 1 tablet by mouth daily',
            quantity: 30,
            refills: 0,
            writtenDate: '03/21/24',
            endDate: '03/21/24',
            prescriber: 'Dr. Smith',
            pharmacy: 'Walgreens',
            status: 'active',
            addToNote: true,
          },
          {
            type: 'External',
            drugName: 'Metformin',
            strength: '500 mg',
            directions: 'Take 1 tablet by mouth twice daily',
            quantity: 60,
            refills: 0,
            writtenDate: '03/21/24',
            endDate: '03/21/24',
            prescriber: 'Dr. Smith',
            pharmacy: 'Walgreens',
            pharmacyError: 'Pharmacy not found',
            status: 'active',
            addToNote: true,
          },
          {
            type: 'Home',
            drugName: 'Simvastatin',
            strength: '20 mg',
            directions: 'Take 1 tablet by mouth daily',
            quantity: 30,
            refills: 0,
            writtenDate: '03/21/24',
            endDate: '03/21/24',
            prescriber: 'Dr. Smith',
            pharmacy: 'Walgreens',
            status: 'active',
            addToNote: true,
          },
          {
            type: 'Current',
            drugName: 'Aspirin',
            strength: '81 mg',
            directions: 'Take 1 tablet by mouth daily',
            quantity: 30,
            refills: 0,
            writtenDate: '03/21/24',
            endDate: '03/21/24',
            prescriber: 'Dr. Smith',
            pharmacy: 'Walgreens',
            status: 'pending',
            addToNote: false,
          },
          {
            type: 'Current',
            drugName: 'Atorvastatin',
            strength: '40 mg',
            directions: 'Take 1 tablet by mouth daily',
            quantity: 30,
            refills: 0,
            writtenDate: '03/21/24',
            endDate: '03/21/24',
            prescriber: 'Dr. Smith',
            pharmacy: 'Walgrens',
            status: 'discontinued',
            addToNote: false,
          },
        ],
      })
    }, 2000)
  })
}

export { getPatientMedicationsAction }

'use server'

import * as api from '@/api'
import type { Patient, PatientRaw } from '../types'

const searchPatientsAction = async ({
  firstName,
  lastName,
  name,
}: {
  firstName?: string
  lastName?: string
  name?: string
}): Promise<api.ActionResult<Patient[]>> => {
  const url = new URL(api.SEARCH_PATIENTS_ENDPOINT)

  url.searchParams.append('limit', '50')
  url.searchParams.append('offset', '0')
  url.searchParams.append('includeInactive', 'false')

  const response = await api.POST<PatientRaw[]>(url.toString(), {
    firstName,
    lastName,
    name,
    roleCodes: ['1'],
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.map((patient) => ({
      id: patient.id,
      firstName: patient.legalName.firstName,
      middleName: patient.legalName.middleName ?? '',
      lastName: patient.legalName.lastName,
      birthdate: patient.birthdate,
      gender: patient.gender,
      medicalRecordNumber: patient.medicalRecordNumber,
      status: patient.status,
      contactDetails: patient?.contactDetails,
    })),
  }
}

export { searchPatientsAction }

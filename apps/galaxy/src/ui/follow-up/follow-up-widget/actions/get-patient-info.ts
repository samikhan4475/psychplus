'use client'

import * as api from '@/api/api.client'
import { SEARCH_PATIENTS_ENDPOINT } from '@/api/endpoints'
import { Patient, PatientRaw } from '@/ui/visit/types'

const getPatientInfoAction = async (
  patientId: string,
): Promise<api.ActionResult<Patient[]>> => {
  const payload = {
    isIncludeInsurance: true,
    isIncludeInsuranceVerification: true,
    isIncludeCardVerification: true,
    isIncludeConsentVerification: true,
    patientIds: [patientId],
  }
  const response = await api.POST<PatientRaw[]>(
    SEARCH_PATIENTS_ENDPOINT,
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data.map((patient) => {
      const state = patient?.contactDetails?.addresses?.[0]?.state ?? ''
      return {
        id: patient.id,
        firstName: patient.legalName.firstName,
        middleName: patient.legalName.middleName ?? '',
        lastName: patient.legalName.lastName,
        birthdate: patient.birthdate,
        state,
        gender: patient.gender,
        medicalRecordNumber: patient.medicalRecordNumber ?? '',
        status: patient.status ?? '',
        contactDetails: patient?.contactDetails,
        isSelfPay: patient.isSelfPay,
      }
    }),
  }
}

export { getPatientInfoAction }

'use server'

import * as api from '@/api'
import type { Prescription } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludePrescription: true,
  isIncludePrescriptionDiagnosis: true,
  isIncludeStaff: true,
  isIncludePharmacy: true,
}
const getPatientPrescriptionAction = async (
  patientId: number,
  id: string,
): Promise<api.ActionResult<Prescription>> => {
  const response = await api.POST<Prescription>(
    api.GET_PATIENT_MEDICATION_ENDPOINT(patientId, id),
    defaultPayload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response?.data,
  }
}

export { getPatientPrescriptionAction }

import * as api from '@psychplus-v2/api'
import { ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { PatientPharmacy } from '../types'

interface PharmaciesPayload {
  pharmacyName?: string
  pharmacyAddress?: string
  pharmacyCity?: string
  pharmacyStateCode?: string
  pharmacyZip?: string
  pharmacyPhone?: string
  userId?: number
  isOnlyDefaults?: boolean
  patientIds?: number[]
}

const getPatientPharmacies = async (
  payload?: PharmaciesPayload,
): Promise<ActionResult<PatientPharmacy[]>> => {
  const result = await api.POST<PatientPharmacy[]>(
    `${API_URL}/api/patients/self/pharmacies/actions/search`,
    {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
      recordStatuses: ['Active'],
      ...payload,
    },
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }
  return {
    state: 'success',
    data: result.data,
  }
}

export { getPatientPharmacies }

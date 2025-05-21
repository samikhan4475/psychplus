'use server'

import * as api from '@/api'
import { MedicationRefill } from '../types'

interface LinkPatientAccountActionParams {
  pharmacyNotificationId: string
  patientId: string
}

const MapPatientAction = async ({
  pharmacyNotificationId,
  patientId,
}: LinkPatientAccountActionParams) => {
  const response = await api.PUT<MedicationRefill>(
    api.MAP_PATIENTS(pharmacyNotificationId, patientId),
    {},
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      note: response.data,
    },
  }
}

export { MapPatientAction }

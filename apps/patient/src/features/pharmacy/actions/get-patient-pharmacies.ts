'use server'

import { ActionResult } from '@psychplus-v2/api'
import { getPatientPharmacies } from '../api'
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

const getPatientPharmaciesAction = async (
  payload?: PharmaciesPayload,
): Promise<ActionResult<PatientPharmacy[]>> =>
  await getPatientPharmacies(payload)

export { getPatientPharmaciesAction }

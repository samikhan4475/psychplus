'use server'

import * as api from '@/api'
import { API_URL } from '@/constants'
import type { PatientProfileRaw } from '@/types'
import {
  getGuardianFirstName,
  getGuardianLastName,
  getPatientDOB,
  getPatientEmail,
  getPatientFirstName,
  getPatientLastName,
  getPatientMiddleName,
  getPatientMRN,
  getPatientPhone,
} from '@/utils'
import type { PatientProfile } from '../types'

const getPatientProfileAction = async (
  id: string,
): Promise<api.ActionResult<PatientProfile>> => {
  const result = await api.GET<PatientProfileRaw>(
    `${API_URL}/api/patients/${id}/profile`,
  )

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: transformResponseData(result.data),
  }
}

const transformResponseData = (data: PatientProfileRaw): PatientProfile => ({
  id: String(data.id),
  mrn: getPatientMRN(data.id),
  firstName: getPatientFirstName(data.legalName),
  middleName: getPatientMiddleName(data.legalName),
  lastName: getPatientLastName(data.legalName),
  dob: getPatientDOB(data.birthdate),
  phone: getPatientPhone(data.contactDetails.phoneNumbers),
  email: getPatientEmail(data.contactDetails),
  hasGuardian: data.guardian !== undefined,
  guardianFirstName: getGuardianFirstName(data.guardian),
  guardianLastName: getGuardianLastName(data.guardian),
})

export { getPatientProfileAction }

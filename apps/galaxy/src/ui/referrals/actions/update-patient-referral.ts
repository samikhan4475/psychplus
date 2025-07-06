'use server'

import * as api from '@/api'
import { PatientReferral } from '@/types'
import { pickFields } from '@/utils'

const updatePatientReferralAction = async (
  referral: PatientReferral,
): Promise<api.ActionResult<PatientReferral>> => {
  const payload = pickFields(referral, [
    'service',
    'servicesStatus',
    'contactStatus',
    'resourceStatus',
    'comments',
    'referredByName',
    'id',
    'patientId',
    'patientEducation',
    'visitTypeId',
    'diagnosis',
    'diagnosisCode',
    'priorAuthorizationStatus',
    'procurement',
    'providerId',
    'referralProviderStaffId',
    'referralProviderLocationId',
    'remsEnrolled',
  ])
  const response = await api.PUT<PatientReferral>(
    api.UPDATE_PATIENT_REFERRAL_ENDPOINT(referral.patientId, referral.id),
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
    data: response.data,
  }
}

export { updatePatientReferralAction }

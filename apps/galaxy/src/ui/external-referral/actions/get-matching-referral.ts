'use server'

import * as api from '@/api'
import { MatchingPatient, Patient } from '@/ui/external-referral/types'

const getMatchingReferralAction = async (
  patient: Patient,
): Promise<api.ActionResult<MatchingPatient>> => {
  const response = await api.POST<MatchingPatient>(
    api.GET_MATCHING_REFERRAL_PATIENTS_ENDPOINT,
    {
      isIncludeFoundResults: true,
      isIncludeMatchDetails: true,
      matchFields: {
        name: patient.patientName,
        dateOfBirth: patient?.patientDateOfBirth,
        gender: patient?.patientGender,
        email: patient?.patientContactDetails?.email,
        phoneNumber: patient?.patientContactDetails?.phoneNumbers?.[0]?.number,
      },
    },
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

export { getMatchingReferralAction }

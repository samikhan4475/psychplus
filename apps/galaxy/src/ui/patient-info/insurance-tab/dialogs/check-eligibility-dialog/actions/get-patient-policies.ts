'use server'

import * as api from '@/api'
import type { PatientInsuranceInfo, SelectOptionType } from '@/types'

const getPatientPoliciesAction = async (
  patientId: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.ADD_PATIENT_POLICY_ENDPOINT(patientId))
  const response = await api.GET<PatientInsuranceInfo>(String(url))

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.policies.map((data) => ({
    value: data.id,
    label: data.policyName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPatientPoliciesAction }

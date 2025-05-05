'use client'

import * as api from '@/api/api.client'
import { SEARCH_PATIENTS_ENDPOINT } from '@/api/endpoints'
import { PatientProfile, SelectOptionType } from '@/types'
import { getPatientFullName } from '@/utils'

const getPatientsOptionsAction = async (
  signal: AbortSignal,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<PatientProfile[]>(SEARCH_PATIENTS_ENDPOINT, {
    signal,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id.toString(),
    label: getPatientFullName(data.legalName),
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPatientsOptionsAction }

'use server'

import * as api from '@/api'
import { PatientProfile, SelectOptionType } from '@/types'

const getPatientsOptionsAction = async (): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.SEARCH_PATIENTS_ENDPOINT)
  const response = await api.POST<PatientProfile[]>(`${url}`, {})

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id.toString(),
    label: data.legalName.firstName + ' ' + data.legalName.lastName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getPatientsOptionsAction }

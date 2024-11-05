'use server'

import * as api from '@/api'
import { PatientProfile, SelectOptionType } from '@/types'
import { PATIENT_LIST_OPTION_SIZE } from '../constants'

const getPatientsOptionsAction = async (
  search: string,
): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.SEARCH_PATIENTS_ENDPOINT)
  url.searchParams.append('limit', String(PATIENT_LIST_OPTION_SIZE))
  const response = await api.POST<PatientProfile[]>(`${url}`, {
    name: search,
  })

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

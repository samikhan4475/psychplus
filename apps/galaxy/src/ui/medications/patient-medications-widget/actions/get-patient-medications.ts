'use server'

import * as api from '@/api'
import { PATIENT_MEDICATIONS_TABLE_PAGE_SIZE } from '../constants'
import type { GetPatientMedicationsParams, PatientMedication } from '../types'

const getPatientMedicationsAction = async ({
  page = 1,
  formValues,
  sort,
}: GetPatientMedicationsParams): Promise<
  api.ActionResult<PatientMedication[]>
> => {
  const payload = {
    ...formValues
  };
  const offset = (page - 1) * PATIENT_MEDICATIONS_TABLE_PAGE_SIZE

  const url = new URL(api.GET_PATIENT_MEDICATIONS())
  url.searchParams.append('limit', String(PATIENT_MEDICATIONS_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  } else {
    url.searchParams.append('orderBy', 'createdOn desc')
  }
  const response = await api.POST<PatientMedication[]>(
    url?.toString(),
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
      status: response.status,
    }
  }

  return {
    state: 'success',
    data: response?.data,
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getPatientMedicationsAction }

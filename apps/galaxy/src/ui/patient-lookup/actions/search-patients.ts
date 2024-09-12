'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import {
  getPatientAge,
  getPatientDOB,
  getPatientEmail,
  getPatientFirstName,
  getPatientGender,
  getPatientLastName,
  getPatientMainAddress,
  getPatientMRN,
} from '@/utils'
import { PATIENT_LOOKUP_TABLE_PAGE_SIZE } from '../constants'
import { SchemaType } from '../patient-lookup-form'
import type { Patient, PatientRaw, SearchPatientsData } from '../types'

interface SearchPatientsParams extends Partial<SchemaType> {
  page?: number
  sort?: Sort
}

const searchPatientsAction = async ({
  page = 1,
  sort,
  ...rest
}: SearchPatientsParams): Promise<api.ActionResult<SearchPatientsData>> => {
  const offset = (page - 1) * PATIENT_LOOKUP_TABLE_PAGE_SIZE

  const url = new URL(api.SEARCH_PATIENTS_ENDPOINT)
  url.searchParams.append('limit', String(PATIENT_LOOKUP_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<PatientRaw[]>(url.toString(), rest)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    data: {
      patients: transformResponseData(response.data),
      total,
    },
  }
}

const transformResponseData = (data: PatientRaw[]): Patient[] =>
  data.map((item) => ({
    id: String(item.id),
    mrn: getPatientMRN(item.id),
    firstName: getPatientFirstName(item.legalName),
    lastName: getPatientLastName(item.legalName),
    dob: getPatientDOB(item.birthdate),
    age: getPatientAge(item.birthdate),
    address: getPatientMainAddress(item.contactDetails.addresses),
    email: getPatientEmail(item.contactDetails),
    gender: getPatientGender(item.gender),
  }))

export { searchPatientsAction }

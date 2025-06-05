'use server'

import * as api from '@/api'
import { Sort } from '@/types'
import { PATIENT_STATEMENTS_LIST_TABLE_PAGE_SIZE } from '../constants'
import {
  patientStatementRecordStatuses,
  patientStatementSlaimStatusCodes,
} from '../enums'
import type {
  PatientStatement,
  PatientStatementPayload,
  PatientStatementsListResponse,
} from '../types'

interface PatientStatementsListParams {
  payload?: PatientStatementPayload
  page?: number
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  claimStatusCodes: [
    patientStatementSlaimStatusCodes.BILLED_TO_PATIENT,
    patientStatementSlaimStatusCodes.PATIENT_RESPONSIBILITY,
  ],
  recordStatuses: [patientStatementRecordStatuses.ACTIVE],
  isGroupedByPatient: false,
  includeServiceLinePayment: true,
}

const getPatientStatementsListAction = async ({
  payload,
  page = 1,
  sort,
}: PatientStatementsListParams): Promise<
  api.ActionResult<PatientStatementsListResponse>
> => {
  const offset = (page - 1) * PATIENT_STATEMENTS_LIST_TABLE_PAGE_SIZE

  let url = new URL(api.GET_PATIENT_STATEMENTS_LIST_ENDPOINT)
  url.searchParams.append(
    'limit',
    String(PATIENT_STATEMENTS_LIST_TABLE_PAGE_SIZE),
  )
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const reqPayload = {
    ...defaultPayLoad,
    ...payload,
  }

  if (!reqPayload.isGroupedByPatient) {
    url = new URL(api.GET_PATIENT_STATEMENTS_LIST_ENDPOINT)
  }

  const response = await api.POST<PatientStatement[]>(`${url}`, reqPayload)

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      patientStatements: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getPatientStatementsListAction }

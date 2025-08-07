'use server'

import * as api from '@/api'
import { Sort } from '@/types'
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
  includeServiceLinePayment: true,
  isGroupedByPatient: false,
}

const getPatientStatementDetailListAction = async ({
  payload,
  sort,
}: PatientStatementsListParams): Promise<
  api.ActionResult<PatientStatementsListResponse>
> => {
  const url = new URL(api.GET_PATIENT_STATEMENTS_LIST_ENDPOINT)
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const reqPayload = {
    ...defaultPayLoad,
    ...payload,
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

export { getPatientStatementDetailListAction }

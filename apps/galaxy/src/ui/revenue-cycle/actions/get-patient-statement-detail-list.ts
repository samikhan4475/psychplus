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
  patientId: number
  payload?: PatientStatementPayload
  sort?: Sort
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  claimStatusCodes: [patientStatementSlaimStatusCodes.BILLED_TO_PATIENT],
  recordStatuses: [patientStatementRecordStatuses.ACTIVE],
  includeServiceLinePayment: true,
}

const getPatientStatementDetailListAction = async ({
  patientId,
  payload,
  sort,
}: PatientStatementsListParams): Promise<
  api.ActionResult<PatientStatementsListResponse>
> => {
  let url = new URL(api.GET_PATIENT_STATEMENT_DETAIL_LIST_ENDPOINT(patientId))
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

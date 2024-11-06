'use server'

import * as api from '@/api'
import {
  FileFormats,
  patientStatementRecordStatuses,
  patientStatementSlaimStatusCodes,
  type PatientStatementPayload,
} from '../types'

interface GenerateStatement {
  id: string
}

const defaultPayLoad = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  claimStatusCodes: [patientStatementSlaimStatusCodes.BILLED_TO_PATIENT],
  recordStatuses: [patientStatementRecordStatuses.ACTIVE],
  isGroupByPatient: true,
  includeServiceLinePayment: true,
}

const generatePatientStatementAction = async (
  payload: PatientStatementPayload,
): Promise<api.ActionResult<GenerateStatement>> => {
  const response = await api.POST<GenerateStatement>(
    api.GENERATE_PATIENT_STATEMENTS_ENDPOINT(FileFormats.PDF),
    { ...defaultPayLoad, ...payload },
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

export { generatePatientStatementAction }

'use server'

import * as api from '@/api'
import { PmpReportRequest, PmpReportResponse } from '../types'

interface PMPReportActionParams {
  payload?: PmpReportRequest
}

const pmpReportAction = async ({
  payload,
}: PMPReportActionParams): Promise<api.ActionResult<PmpReportResponse>> => {
  const url = new URL(
    api.PMP_REPORT(
      String(payload?.patientId),
      String(payload?.pmpPrescriptionId),
    ),
  )
  const response = await api.POST<PmpReportResponse>(`${url}`, {
    ...payload,
  })

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

export { pmpReportAction }

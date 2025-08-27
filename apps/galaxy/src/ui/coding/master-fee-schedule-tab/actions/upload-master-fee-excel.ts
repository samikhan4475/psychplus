'use server'

import * as api from '@/api'
import { MasterFreeUploadResponse } from '../../types'

const uploadMasterFeeScheduleExcelAction = async (
  payload: FormData,
  formatType: string,
  fileName: string,
): Promise<api.ActionResult<MasterFreeUploadResponse>> => {
  const url = new URL(api.MASTER_FEE_SCHEDULE_UPLOAD_EXCEL_ENDPOINT(formatType))
  url.searchParams.set('importTagName', fileName)
  const response = await api.POST<MasterFreeUploadResponse>(
    String(url),
    payload,
    {
      ignoreHeaders: false,
    },
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

export { uploadMasterFeeScheduleExcelAction }

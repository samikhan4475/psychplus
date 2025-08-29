'use server'

import * as api from '@/api'
import { PayerFilter } from '@/types'

interface ExportPayersParams {
  fileFormat: string
  payload?: Partial<PayerFilter>
}

const exportPayersAction = async ({
  fileFormat,
  payload,
}: ExportPayersParams): Promise<api.ActionResult<Blob>> => {
  const defaultPayload = {
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceIds: true,
    isIncludeMetadataResourceStatus: true,
  }

  const requestPayload = {
    ...defaultPayload,
    ...payload,
  }

  const response = await api.POST<Blob>(
    api.PAYERS_EXPORT_ENDPOINT(fileFormat),
    requestPayload,
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

export { exportPayersAction }

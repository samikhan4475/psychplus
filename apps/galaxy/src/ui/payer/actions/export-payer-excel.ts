'use client'

import { PAYERS_EXPORT_ENDPOINT } from '@/api/endpoints'
import { sanitizeFormData } from '@/utils'
import { downloadFile } from '@/utils/download'
import { FileFormats } from '../types'

interface ExportPayerExcelParams {
  payload?: Record<string, unknown>
}

const exportPayerExcelAction = async ({ payload }: ExportPayerExcelParams) => {
  try {
    const defaultPayload = {
      isIncludeMetadataResourceChangeControl: true,
      isIncludeMetadataResourceIds: true,
      isIncludeMetadataResourceStatus: true,
    }

    const exportPayload = {
      ...defaultPayload,
      ...sanitizeFormData(payload || {}),
    }

    const endpoint = PAYERS_EXPORT_ENDPOINT(FileFormats.EXCEL)
    const fileName = `Payer_Report_${
      new Date().toISOString().split('T')[0]
    }.xlsx`

    await downloadFile(endpoint, fileName, 'POST', exportPayload)

    return {
      state: 'success' as const,
      message: 'Payer report exported successfully',
    }
  } catch (error) {
    const message =
      (error instanceof Error && error.message) || 'Failed to export payers'

    return {
      state: 'error' as const,
      error: message,
    }
  }
}

export { exportPayerExcelAction }

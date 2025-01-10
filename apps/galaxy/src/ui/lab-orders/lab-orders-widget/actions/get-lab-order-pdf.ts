'use server'

import * as api from '@/api'

const getLabOrderPdfAction = async (
  appointmentId: string,
  orderId: string,
  documentId: string,
): Promise<api.ActionResult<string>> => {
  const response = await api.GET<string>(
    api.DOWNLOAD_LAB_ORDER_DOCUMENT(appointmentId, orderId, documentId),
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

export { getLabOrderPdfAction }

'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { NotifyProviderPayload } from '../types'

const notifyProvider = (payload: NotifyProviderPayload) => {
  return api.POST<null>(
    `${API_URL}/api/communications/actions/notifystaff`,
    payload,
  )
}

export { notifyProvider }

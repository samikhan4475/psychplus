import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { Consent } from '@psychplus-v2/types'

const getConsents = () =>
  api.GET<Consent[]>(`${API_URL}/api/patients/self/consents`)

export { getConsents }

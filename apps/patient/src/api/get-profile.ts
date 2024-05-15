import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import type { PatientProfile } from '@psychplus-v2/types'

const getProfile = () =>
  api.GET<PatientProfile>(`${API_URL}/api/patients/self/profile`)

export { getProfile }

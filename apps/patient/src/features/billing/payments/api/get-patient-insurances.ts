'use server'

import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { Insurance } from '@/features/billing/payments/types'

const getPatientInsurances = () =>
  api.GET<Insurance>(
    `${API_URL}/api/patients/self/policies?includeInactive=false`,
  )

export { getPatientInsurances }

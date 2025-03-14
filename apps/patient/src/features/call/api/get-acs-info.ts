import * as api from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { AcsInfo } from '../types'

interface PatientAcsInfoPayload {
  staffId: string
  appointmentId: string
}

const getAcsInfo = (payload: PatientAcsInfoPayload) =>
  api.POST<AcsInfo>(
    `${API_URL}/api/patients/self/communications/actions/accesstoken`,
    payload,
  )

export { getAcsInfo }

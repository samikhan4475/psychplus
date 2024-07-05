import { cache } from 'react'
import { PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { PatientPreferredPartner } from './types'

const getPatientPreferredPartners = ({
  patientId,
}: PatientParams): Promise<PatientPreferredPartner[]> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/preferredpartners`, {
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const getPatientPreferredPartnersCached = cache(getPatientPreferredPartners)

export { getPatientPreferredPartnersCached as getPatientPreferredPartners }

import { cache } from 'react'
import { api } from '@psychplus/api'
import { type PatientParams } from '@psychplus/patient'
import { MOCK_API_URL } from '@psychplus/utils/constants'
import { PatientReferral } from './types'

const getPatientReferrals = async ({
  patientId,
}: PatientParams): Promise<PatientReferral[]> =>
  api(`${MOCK_API_URL}/api/patients/${patientId}/referrals`)

const getPatientReferralsCached = cache(getPatientReferrals)

export { getPatientReferralsCached as getPatientReferrals }

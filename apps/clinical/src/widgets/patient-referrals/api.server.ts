import { cache } from 'react'
import { type PatientParams } from '@psychplus/patient'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type PatientReferral } from './types'

const getPatientReferrals = ({
  patientId,
}: PatientParams): Promise<PatientReferral[]> =>
  fetch(forwardQuery(`${APP_HOST}/api/patients/${patientId}/referrals`), {
    cache: 'no-store',
  }).then((res) => res.json())

const getPatientReferralsCached = cache(getPatientReferrals)

export { getPatientReferralsCached as getPatientReferrals }

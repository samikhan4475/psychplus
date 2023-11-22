import { cache } from 'react'
import { type PatientParams } from '@psychplus/patient'
import { handleRequest } from '@psychplus/utils/api'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type PatientReferral } from './types'

const getPatientReferrals = ({
  patientId,
}: PatientParams): Promise<PatientReferral[]> =>
  handleRequest(
    fetch(forwardQuery(`${APP_HOST}/api/patients/${patientId}/referrals`), {
      cache: 'no-store',
    }),
  )

const getPatientReferralsCached = cache(getPatientReferrals)

export { getPatientReferralsCached as getPatientReferrals }

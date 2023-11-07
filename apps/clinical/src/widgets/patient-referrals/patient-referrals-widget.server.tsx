import type { PatientParams, TokenParams } from '@psychplus/types'
import { PatientPreloader } from '@psychplus/store/patient'
import { PatientReferralsPreloader } from '@psychplus/store/patient-referrals'
import { UserPreloader } from '@psychplus/store/user'
import * as api from '@psychplus/api/server'
import { PatientReferralsWidgetClient } from './patient-referrals-widget.client'
import { useStore } from './store'

type PatientReferralsWidgetProps = TokenParams & PatientParams

const PatientReferralsWidgetServer = async ({
  token,
  patientId,
}: PatientReferralsWidgetProps) => {
  const [user, patient, referrals] = await Promise.all([
    api.getUser({ token }),
    api.getPatient({ token, patientId }),
    api.getPatientReferrals({ token, patientId }),
  ])

  return (
    <>
      <UserPreloader user={user} store={[useStore]} />
      <PatientPreloader patient={patient} store={[useStore]} />
      <PatientReferralsPreloader referrals={referrals} store={[useStore]} />
      <PatientReferralsWidgetClient />
    </>
  )
}

export { PatientReferralsWidgetServer, type PatientReferralsWidgetProps }

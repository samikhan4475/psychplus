import {
  getPatient,
  PatientPreloader,
  type PatientParams,
} from '@psychplus/patient'
import { getUser, UserPreloader } from '@psychplus/user'
import { getPatientReferrals } from './api'
import { PatientReferralsWidgetClient } from './patient-referrals-widget.client'
import { PatientReferralsPreloader, useStore } from './store'

type PatientReferralsWidgetProps = PatientParams

const PatientReferralsWidgetServer = async ({
  patientId,
}: PatientReferralsWidgetProps) => {
  const [user, patient, referrals] = await Promise.all([
    getUser(),
    getPatient({ patientId }),
    getPatientReferrals({ patientId }),
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

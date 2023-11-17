import { unstable_noStore as noStore } from 'next/cache'
import { PatientPreloader, type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { UserPreloader } from '@psychplus/user'
import { getUser } from '@psychplus/user/api.server'
import { getPatientReferrals } from './api.server'
import { PatientReferralsWidgetClient } from './patient-referrals-widget.client'
import { PatientReferralsPreloader, useStore } from './store'

type PatientReferralsWidgetProps = PatientParams

const PatientReferralsWidgetServer = async ({
  patientId,
}: PatientReferralsWidgetProps) => {
  noStore()

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

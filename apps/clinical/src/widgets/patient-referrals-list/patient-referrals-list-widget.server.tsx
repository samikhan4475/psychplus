import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { type PatientParams } from '@psychplus/patient'
import { getPatient } from '@psychplus/patient/api.server'
import { getPatientReferrals } from '@psychplus/referrals/api.server'
import { getUser } from '@psychplus/user/api.server'
import { PatientReferralsListWidgetClient } from './patient-referrals-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

type PatientReferralsListWidgetServerProps = PatientParams

const PatientReferralsListWidgetServer = async ({
  patientId,
}: PatientReferralsListWidgetServerProps) => {
  noStore()

  const [codeSets, user, patient, referrals] = await Promise.all([
    getCodeSets(),
    getUser(),
    getPatient({ patientId }),
    getPatientReferrals({ patientId }),
  ])

  if (!patient.id) return <div>Patient with id {patientId} not found</div>

  return (
    <>
      <Preloader
        store={useStore}
        user={user}
        patient={patient}
        codeSets={codeSets}
        referrals={referrals}
      />
      <PatientReferralsListWidgetClient />
    </>
  )
}

export { PatientReferralsListWidgetServer }

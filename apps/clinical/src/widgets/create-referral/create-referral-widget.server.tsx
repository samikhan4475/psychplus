import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { getPatient } from '@psychplus/patient/api.server'
import { getStaff, getUser } from '@psychplus/user/api.server'
import { getReferrals } from './api.server'
import { CreateReferralWidgetClient } from './create-referral-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

interface CreateReferralWidgetServerProps {
  patientId: number
}

const CreateReferralWidgetServer = async ({
  patientId,
}: CreateReferralWidgetServerProps) => {
  noStore()

  const [codeSets, user, staff, patient, referrals] = await Promise.all([
    getCodeSets(),
    getUser(),
    getStaff(),
    getPatient({ patientId }),
    getReferrals({ patientId }),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        user={user}
        staff={staff}
        patient={patient}
        codeSets={codeSets}
        referrals={referrals}
      />
      <CreateReferralWidgetClient />
    </>
  )
}

export { CreateReferralWidgetServer }

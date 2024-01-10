import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { searchReferrals } from '@psychplus/referrals/api.server'
import { getUser } from '@psychplus/user/api.server'
import { AllReferralsListWidgetClient } from './all-referrals-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const AllReferralsListWidgetServer = async () => {
  noStore()

  const [codeSets, user, referrals] = await Promise.all([
    getCodeSets(),
    getUser(),
    searchReferrals(),
  ])

  return (
    <>
      <Preloader
        store={useStore}
        user={user}
        codeSets={codeSets}
        referrals={referrals}
      />
      <AllReferralsListWidgetClient />
    </>
  )
}

export { AllReferralsListWidgetServer }

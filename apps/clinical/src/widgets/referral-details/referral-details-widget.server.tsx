import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { Preloader } from './preloader'
import { ReferralDetailsWidgetClient } from './referral-details-widget.client'
import { useStore } from './store'

const ReferralDetailsWidgetServer = async () => {
  noStore()

  const codeSets = await getCodeSets()

  return (
    <>
      <Preloader store={useStore} codeSets={codeSets} />
      <ReferralDetailsWidgetClient />
    </>
  )
}

export { ReferralDetailsWidgetServer }

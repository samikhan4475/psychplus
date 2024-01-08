import { unstable_noStore as noStore } from 'next/cache'
import { getCodeSets } from '@psychplus/codeset/api.server'
import { EditReferralWidgetClient } from './edit-referral-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const EditReferralWidgetServer = async () => {
  noStore()

  const codeSets = await getCodeSets()

  return (
    <>
      <Preloader store={useStore} codeSets={codeSets} />
      <EditReferralWidgetClient />
    </>
  )
}

export { EditReferralWidgetServer }

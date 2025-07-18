import { unstable_noStore as noStore } from 'next/cache'
import { CODESETS } from '@psychplus-v2/constants'
import { getCodesets } from '@/api'
import { CodesetStoreProvider, ToastProvider } from '@/providers'
import { AddExtReferralClient } from './add-ext-referral.client'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'

const AddExtReferralServer = async () => {
  noStore()

  const [codesets] = await Promise.all([
    getCodesets([
      CODESETS.Language,
      CODESETS.UsStates,
      CODESETS.ServicesOffered,
    ]),
  ])

  return (
    <ToastProvider>
      <CodesetStoreProvider codesets={codesets}>
        <AddExtReferralClient googleAPIkey={GOOGLE_MAPS_API_KEY} />
      </CodesetStoreProvider>
    </ToastProvider>
  )
}

export { AddExtReferralServer }

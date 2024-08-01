import { unstable_noStore as noStore } from 'next/cache'
import { getClaimsList } from './api.server'
import { ClaimWidgetClient } from './claim-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ClaimWidgetServer = async () => {
  noStore()

  const claimsList = await getClaimsList()

  return (
    <>
      <Preloader store={useStore} claimsList={claimsList} />
      <ClaimWidgetClient />
    </>
  )
}

export { ClaimWidgetServer }

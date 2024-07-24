import { unstable_noStore as noStore } from 'next/cache'
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'
import { getUsStatesCodeSets } from './api.server'
import { ClearingHouseReceiverListWidgetClient } from './clearing-house-receiver-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ClearingHouseReceiverListWidgetServer = async () => {
  noStore()
  const usStatesCodeSet = await getUsStatesCodeSets()

  return (
    <>
      <Preloader store={useStore} usStatesCodeSet={usStatesCodeSet} />
      <ClearingHouseReceiverListWidgetClient
        googleApiKey={GOOGLE_MAPS_API_KEY ?? ''}
      />
    </>
  )
}

export { ClearingHouseReceiverListWidgetServer }

import { unstable_noStore as noStore } from 'next/cache'
import { useStore } from '@psychplus/management-locations'
import { getUsStatesCodeSets } from '@psychplus/management-locations/api.server'
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'
import { AddManagmentLocationsClient } from './add-management-locations-widget.client'
import { Preloader } from './preloader'

const AddManagementLocationsWidgetServer = async () => {
  noStore()

  const [usStatesCodeSet] = await Promise.all([getUsStatesCodeSets()])

  return (
    <>
      <Preloader store={useStore} usStatesCodeSet={usStatesCodeSet} />
      <AddManagmentLocationsClient googleApiKey={GOOGLE_MAPS_API_KEY ?? ''} />
    </>
  )
}

export { AddManagementLocationsWidgetServer }

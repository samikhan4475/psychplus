import { unstable_noStore as noStore } from 'next/cache'
import { getLocations } from '@psychplus/management-locations/utils'
import { ManagementLocationsWidgetClient } from './management-locations-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ManagementLocationsWidgetServer = async () => {
  noStore()

  const [locations] = await Promise.all([getLocations()])

  return (
    <>
      <Preloader locations={locations} store={useStore} />
      <ManagementLocationsWidgetClient />
    </>
  )
}

export { ManagementLocationsWidgetServer }

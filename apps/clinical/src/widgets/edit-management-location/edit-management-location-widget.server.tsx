import { unstable_noStore as noStore } from 'next/cache'
import { getUsStatesCodeSets } from '@psychplus/patient-info/api.server'
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'
import { EditManagementLocationClient } from './edit-management-location-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const EditManagementLocationWidgetServer = async () => {
  noStore()

  const [usStatesCodeSet] = await Promise.all([getUsStatesCodeSets()])

  return (
    <>
      <Preloader store={useStore} usStatesCodeSet={usStatesCodeSet} />
      <EditManagementLocationClient googleApiKey={GOOGLE_MAPS_API_KEY ?? ''} />
    </>
  )
}

export { EditManagementLocationWidgetServer }

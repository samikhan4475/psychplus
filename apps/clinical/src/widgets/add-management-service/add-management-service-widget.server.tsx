import { unstable_noStore as noStore } from 'next/cache'
import { getUsStatesCodeSets } from '@psychplus/patient-info/api.server'
import { GOOGLE_MAPS_API_KEY } from '@psychplus/utils/constants'
import { AddManagmentServiceClient } from './add-management-service-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const AddManagementServiceWidgetServer = async () => {
  noStore()

  const [usStatesCodeSet] = await Promise.all([getUsStatesCodeSets()])

  return (
    <>
      <Preloader store={useStore} usStatesCodeSet={usStatesCodeSet} />
      <AddManagmentServiceClient googleApiKey={GOOGLE_MAPS_API_KEY ?? ''} />
    </>
  )
}

export { AddManagementServiceWidgetServer }

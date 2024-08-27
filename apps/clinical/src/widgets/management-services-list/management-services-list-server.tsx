import { unstable_noStore as noStore } from 'next/cache'
import { getServices } from '@psychplus/management-services/api.server'
import { ManagementServicesListWidgetClient } from './management-services-list-widget.client'
import { Preloader } from './preloader'
import { useStore } from './store'

const ManagementServicesListWidgetServer = async () => {
  const [services] = await Promise.all([getServices()])
  noStore()
  return (
    <>
      <Preloader services={services} store={useStore} />
      <ManagementServicesListWidgetClient />
    </>
  )
}

export { ManagementServicesListWidgetServer }

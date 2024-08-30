import { unstable_noStore as noStore } from 'next/cache'
import { ManagementLocationTabsWidgetClient } from './management-location-tabs-widget.client'

const ManagementLocationsWidgetServer = () => {
  noStore()

  return <ManagementLocationTabsWidgetClient />
}

export { ManagementLocationsWidgetServer }

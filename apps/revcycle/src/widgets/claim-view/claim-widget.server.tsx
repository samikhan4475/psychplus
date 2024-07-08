import { unstable_noStore as noStore } from 'next/cache'
import { ClaimWidgetClient } from './claim-widget.client'

const ClaimWidgetServer = () => {
  noStore()
  return <ClaimWidgetClient />
}

export { ClaimWidgetServer }

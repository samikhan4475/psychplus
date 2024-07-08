import { unstable_noStore as noStore } from 'next/cache'
import { ClaimFormWidgetClient } from './claim-form-widget.client'

const ClaimFormWidgetServer = () => {
  noStore()

  return <ClaimFormWidgetClient />
}

export { ClaimFormWidgetServer }

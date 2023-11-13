import { withAPI } from '@psychplus/ui/with-api'
import { ClaimStatusConfigWidgetServer } from '@/widgets/claim-status-config'

const ClaimStatusWidgetPage = () => {
  return <ClaimStatusConfigWidgetServer />
}

export default withAPI(ClaimStatusWidgetPage)

import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createUrlParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const ClaimStatusConfigWidget = () => {
  const params = createUrlParams()

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/claim-status-config?${params.toString()}`}
    />
  )
}

export { ClaimStatusConfigWidget }

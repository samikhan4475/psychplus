import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const ClaimStatusConfigWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/revcycle/widgets/claim-status-config?${searchParams.toString()}`}
      name="claim-status-config"
    />
  )
}

export { ClaimStatusConfigWidget }

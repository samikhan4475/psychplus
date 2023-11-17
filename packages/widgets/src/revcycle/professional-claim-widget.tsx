import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

interface Props {
  claimId?: string
}

const ProfessionalClaimWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    claimId: props.claimId,
  })

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/professional-claim?${searchParams.toString()}`}
    />
  )
}

export { ProfessionalClaimWidget }

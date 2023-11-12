import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createUrlParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

interface Props {
  claimId?: string
}

const ProfessionalClaimWidget = (props: Props) => {
  const params = createUrlParams({
    claimId: props.claimId,
  })

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/professional-claim?${params.toString()}`}
    />
  )
}

export { ProfessionalClaimWidget }

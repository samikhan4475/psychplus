import { REVCYCLE_URL } from '@psychplus/env'
import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components/widget'

interface Props {
  claimId?: string
}

const ProfessionalClaimWidget = (props: Props) => {
  const params = new URLSearchParams()

  const token = getAuthToken()

  if (token) {
    params.append('token', token)
  }

  if (props.claimId) {
    params.append('claimId', props.claimId)
  }

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/professional-claim?${params.toString()}`}
    />
  )
}

export { ProfessionalClaimWidget }

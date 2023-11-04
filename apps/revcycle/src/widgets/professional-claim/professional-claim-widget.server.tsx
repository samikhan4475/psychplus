import { TokenParams } from '@psychplus/types'
import { ProfessionalClaimWidgetClient } from './professional-claim-widget.client'

type ProfessionalClaimWidgetProps = TokenParams & {
  claimId?: string
}

const ProfessionalClaimWidgetServer = ({
  token,
  claimId,
}: ProfessionalClaimWidgetProps) => {
  return (
    <>
      <ProfessionalClaimWidgetClient token={token} />
    </>
  )
}

export { ProfessionalClaimWidgetServer, type ProfessionalClaimWidgetProps }

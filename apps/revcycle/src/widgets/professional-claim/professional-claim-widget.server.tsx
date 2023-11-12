import { ProfessionalClaimWidgetClient } from './professional-claim-widget.client'

interface ProfessionalClaimWidgetProps {
  claimId?: string
}

const ProfessionalClaimWidgetServer = ({
  claimId,
}: ProfessionalClaimWidgetProps) => {
  return (
    <>
      <ProfessionalClaimWidgetClient />
    </>
  )
}

export { ProfessionalClaimWidgetServer, type ProfessionalClaimWidgetProps }

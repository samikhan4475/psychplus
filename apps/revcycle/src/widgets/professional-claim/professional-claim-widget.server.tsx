import { unstable_noStore as noStore } from 'next/cache'
import { ProfessionalClaimWidgetClient } from './professional-claim-widget.client'

interface ProfessionalClaimWidgetProps {
  claimId?: string
}

const ProfessionalClaimWidgetServer = ({
  claimId,
}: ProfessionalClaimWidgetProps) => {
  noStore()

  return (
    <>
      <ProfessionalClaimWidgetClient />
    </>
  )
}

export { ProfessionalClaimWidgetServer, type ProfessionalClaimWidgetProps }

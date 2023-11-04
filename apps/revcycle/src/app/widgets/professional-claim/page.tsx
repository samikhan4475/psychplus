import type { SearchParams } from '@psychplus/types'
import { ProfessionalClaimWidgetServer } from '@/widgets/professional-claim'

const ProfessionalClaimWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.token) {
    return <div>Token is required</div>
  }

  return (
    <ProfessionalClaimWidgetServer
      token={searchParams.token}
      claimId={searchParams.claimId}
    />
  )
}

export default ProfessionalClaimWidgetPage

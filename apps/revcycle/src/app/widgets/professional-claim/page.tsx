import { type SearchParams } from '@psychplus/utils/url'
import { ProfessionalClaimWidgetServer } from '@/widgets/professional-claim'

const ProfessionalClaimWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  return <ProfessionalClaimWidgetServer claimId={searchParams.claimId} />
}

export default ProfessionalClaimWidgetPage

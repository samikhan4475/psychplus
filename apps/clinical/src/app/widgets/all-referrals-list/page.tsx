import { type SearchParams } from '@psychplus/utils/url'
import { AllReferralsListWidgetServer } from '@/widgets/all-referrals-list'

const AllReferralsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  return <AllReferralsListWidgetServer />
}

export default AllReferralsListWidgetPage

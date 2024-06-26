import { Text } from '@radix-ui/themes'
import { type SearchParams } from '@psychplus/utils/url'
import { PreferredPartnersFinancialInfoWidgetServer } from '@/widgets/preferred-partners-financial-info'

const CreditCardWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.partnerId) {
    return <Text>Preferred Partner ID is required</Text>
  }

  return (
    <PreferredPartnersFinancialInfoWidgetServer
      partnerId={searchParams.partnerId}
    />
  )
}

export default CreditCardWidgetPage

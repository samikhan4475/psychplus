import { unstable_noStore as noStore } from 'next/cache'
import { PreferredPartnersFinancialInfoWidgetClient } from './preferred-partners-financial-info-widget.client'

const PreferredPartnersFinancialInfoWidgetServer = ({
  partnerId,
}: {
  partnerId: string
}) => {
  noStore()

  return (
    <PreferredPartnersFinancialInfoWidgetClient
      preferredPartnerId={partnerId}
    />
  )
}

export { PreferredPartnersFinancialInfoWidgetServer }

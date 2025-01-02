import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { FeatureContainer } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import { GooglePlacesContextProvider } from '@/providers'
import Payments from './blocks/Payment'

const Payment = ({
  creditCards,
  stripeApiKey,
}: {
  creditCards: CreditCard[]
  stripeApiKey: string
}) => {
  return (
    <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <FeatureContainer>
        <Payments
          creditCards={sortCreditCardsByPrimary(creditCards)}
          stripeApiKey={stripeApiKey}
        />
      </FeatureContainer>
    </GooglePlacesContextProvider>
  )
}

export { Payment }

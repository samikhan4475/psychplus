import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { FeatureContainer } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import { GooglePlacesContextProvider } from '@/providers'
import { PaymentMethodsForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-cards-form'

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
      <PaymentMethodsForm creditCards={sortCreditCardsByPrimary(creditCards)} stripeApiKey={stripeApiKey} />
      </FeatureContainer>
    </GooglePlacesContextProvider>
  )
}

export { Payment }

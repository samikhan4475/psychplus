import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { FeatureCard, FeatureContainer } from '@/components-v2'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { PaymentMethodsForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-cards-form'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import { GooglePlacesContextProvider } from '@/providers'

const PaymentView = ({
  creditCards,
  stripeApiKey,
}: {
  creditCards: CreditCard[]
  stripeApiKey: string
}) => {
  return (
    <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <FeatureContainer>
        <FeatureCard
          title="Cards on File"
          contentClassName="gap-3 relative"
          showTitleInsideCard
        >
          <PaymentMethodsForm
            creditCards={sortCreditCardsByPrimary(creditCards)}
            stripeApiKey={stripeApiKey}
          />
        </FeatureCard>
      </FeatureContainer>
    </GooglePlacesContextProvider>
  )
}

export { PaymentView }

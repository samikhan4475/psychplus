'use client'

import { useEffect } from 'react'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { FeatureCard, FeatureContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { PaymentMethodsForm } from '@/features/billing/credit-debit-cards/ui/credit-debit-cards-card/credit-debit-cards-form'
import { sortCreditCardsByPrimary } from '@/features/billing/credit-debit-cards/utils'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { GooglePlacesContextProvider } from '@/providers'

const PaymentView = ({
  creditCards,
  stripeApiKey,
}: {
  creditCards: CreditCard[]
  stripeApiKey: string
}) => {
  const { isSaveButtonPressed, save } = useStore()
  const patientId = useProfileStore((state) => state.profile.id)

  useEffect(() => {
    if (isSaveButtonPressed)
      save({ isTabCompleted: creditCards.length > 0, patientId })
  }, [isSaveButtonPressed])

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

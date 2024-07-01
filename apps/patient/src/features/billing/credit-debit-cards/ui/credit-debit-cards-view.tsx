import { CODESETS } from '@psychplus-v2/constants'
import { STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { getCodesets } from '@/api'
import { FeatureContainer } from '@/components-v2'
import { getCreditCards } from '@/features/billing/credit-debit-cards/api'
import { CodesetStoreProvider } from '@/providers'
import { sortCreditCardsByPrimary } from '../utils'
import { PaymentMethodsCard } from './credit-debit-cards-card'

const CreditDebitCardsView = async () => {
  const creditCardsResponse = await getCreditCards()

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.UsStates,
  ])

  if (creditCardsResponse.state === 'error') {
    throw new Error(creditCardsResponse.error)
  }

  return (
    <CodesetStoreProvider codesets={codesets}>
      <FeatureContainer>
        <PaymentMethodsCard
          creditCards={sortCreditCardsByPrimary(creditCardsResponse.data)}
          stripeApiKey={STRIPE_PUBLISHABLE_KEY}
        />
      </FeatureContainer>
    </CodesetStoreProvider>
  )
}

export { CreditDebitCardsView }

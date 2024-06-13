import { CODESETS } from '@psychplus-v2/constants'
import { getCodesets } from '@/api'
import { FeatureContainer } from '@/components-v2'
import {
  getCreditCards,
  getStripeApiKey,
} from '@/features/billing/credit-debit-cards/api'
import { CodesetStoreProvider } from '@/providers'
import { PaymentMethodsCard } from './credit-debit-cards-card'

const CreditDebitCardsView = async () => {
  const [creditCardsResponse, stripeApiKeyResponse] = await Promise.all([
    getCreditCards(),
    getStripeApiKey(),
  ])

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.UsStates,
  ])

  if (creditCardsResponse.state === 'error') {
    throw new Error(creditCardsResponse.error)
  }

  if (stripeApiKeyResponse.state === 'error') {
    throw new Error(stripeApiKeyResponse.error)
  }

  const sortCreditCardsByPrimary = () =>
    creditCardsResponse.data?.sort(
      (a, b) => Number(b.isPrimary) - Number(a.isPrimary),
    )

  return (
    <CodesetStoreProvider codesets={codesets}>
      <FeatureContainer>
        <PaymentMethodsCard
          creditCards={sortCreditCardsByPrimary()}
          stripeApiKey={stripeApiKeyResponse.data}
        />
      </FeatureContainer>
    </CodesetStoreProvider>
  )
}

export { CreditDebitCardsView }

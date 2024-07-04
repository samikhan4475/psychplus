import { CODESETS } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import { getCodesets } from '@/api'
import { FeatureContainer } from '@/components-v2'
import {
  getCreditCards,
  getInsurancePayers,
  getPatientInsurances,
  getPaymentHistory,
  getStripeApiKey,
} from '@/features/billing/payments/api'
import { CodesetStoreProvider } from '@/providers'
import { InsuranceCard } from './insurance-card'

const InsuranceView = async () => {
  const [
    creditCardsResponse,
    stripeApiKeyResponse,
    insurancePayerResponse,
    patientInsurancesResponse,
    paymentHistoryResponse,
  ] = await Promise.all([
    getCreditCards(),
    getStripeApiKey(),
    getInsurancePayers(),
    getPatientInsurances(),
    getPaymentHistory(),
  ])

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.InsurancePolicyPriority,
  ])

  if (creditCardsResponse.state === 'error') {
    throw new Error(creditCardsResponse.error)
  }

  if (stripeApiKeyResponse.state === 'error') {
    throw new Error(stripeApiKeyResponse.error)
  }

  if (insurancePayerResponse.state === 'error') {
    throw new Error(insurancePayerResponse.error)
  }

  if (patientInsurancesResponse.state === 'error') {
    throw new Error(patientInsurancesResponse.error)
  }

  if (paymentHistoryResponse.state === 'error') {
    throw new Error(paymentHistoryResponse.error)
  }

  return (
    <CodesetStoreProvider codesets={codesets}>
      <Flex direction="column" gap="5">
        <FeatureContainer>
          <InsuranceCard
            patientInsurances={patientInsurancesResponse.data}
            insurancePayers={insurancePayerResponse.data}
          />
        </FeatureContainer>
      </Flex>
    </CodesetStoreProvider>
  )
}

export { InsuranceView }
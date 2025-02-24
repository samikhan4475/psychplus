import { CODESETS } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import { getCodesets } from '@/api'
import { FeatureContainer } from '@/components-v2'
import {
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import { CodesetStoreProvider } from '@/providers'
import { InsuranceCard } from './insurance-card'

const InsuranceView = async () => {
  const [insurancePayerResponse, patientInsurancesResponse] = await Promise.all(
    [getInsurancePayers(), getPatientInsurances()],
  )

  const codesets = await getCodesets([
    CODESETS.InsuranceRelationship,
    CODESETS.Gender,
    CODESETS.InsurancePolicyPriority,
  ])

  if (insurancePayerResponse.state === 'error') {
    throw new Error(insurancePayerResponse.error)
  }

  if (patientInsurancesResponse.state === 'error') {
    throw new Error(patientInsurancesResponse.error)
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

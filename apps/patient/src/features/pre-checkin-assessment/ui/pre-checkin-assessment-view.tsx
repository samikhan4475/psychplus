import { CODESETS } from '@psychplus-v2/constants'
import { STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { Box } from '@radix-ui/themes'
import { getCodesets, getProfile } from '@/api'
import { getCreditCards } from '@/features/billing/credit-debit-cards/api'
import {
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import { CodesetStoreProvider } from '@/providers'
import { PreCheckinAssessmentStapper } from './pre-checkin-assessment-stepper/pre-checkin-assessment-stapper'
import { ProfileStoreProvider } from '@/features/account/profile/store'

const PreCheckinAssessmentView = async () => {
  const [
    insurancePayerResponse,
    patientInsurancesResponse,
    creditCardsResponse,
    codesets,
    profileResponse,
  ] = await Promise.all([
    getInsurancePayers(),
    getPatientInsurances(),
    getCreditCards(),
    getCodesets([
      CODESETS.Gender,
      CODESETS.InsuranceRelationship,
      CODESETS.InsurancePolicyPriority,
      CODESETS.UsStates,
    ]),
    getProfile(),
  ])

  if (insurancePayerResponse.state === 'error') {
    throw new Error(insurancePayerResponse.error)
  }

  if (patientInsurancesResponse.state === 'error') {
    throw new Error(patientInsurancesResponse.error)
  }

  if (creditCardsResponse.state === 'error') {
    throw new Error(creditCardsResponse.error)
  }

  if(profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <Box className="mx-auto w-[1000px]">
          <PreCheckinAssessmentStapper
            insurancePayers={insurancePayerResponse.data}
            patientInsurances={patientInsurancesResponse.data}
            creditCards={creditCardsResponse.data}
            stripeAPIKey={STRIPE_PUBLISHABLE_KEY}
          />
        </Box>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export { PreCheckinAssessmentView }

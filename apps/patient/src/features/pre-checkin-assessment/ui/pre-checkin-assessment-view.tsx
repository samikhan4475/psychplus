import { CODESETS } from '@psychplus-v2/constants'
import { STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { Box } from '@radix-ui/themes'
import { getCodesets, getIsFeatureFlagEnabled, getProfile } from '@/api'
import { FeatureFlags } from '@/constants'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { getCreditCards } from '@/features/billing/credit-debit-cards/api'
import {
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import { getNoteDetails } from '@/features/note/api'
import { NoteSectionName } from '@/features/note/constants'
import { getPatientPharmacies } from '@/features/pharmacy/api'
import { CodesetStoreProvider } from '@/providers'
import { PreCheckinAssessmentStapper } from './pre-checkin-assessment-stepper/pre-checkin-assessment-stapper'

const PreCheckinAssessmentView = async () => {
  const [
    insurancePayerResponse,
    patientInsurancesResponse,
    creditCardsResponse,
    codesets,
    profileResponse,
    pharmaciesResponse,
    dawSystemFeatureFlagResponse,
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
    getPatientPharmacies(),
    getIsFeatureFlagEnabled(FeatureFlags.ehr8973EnableDawMedicationApi),
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

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  if (pharmaciesResponse.state === 'error') {
    throw new Error(pharmaciesResponse.error)
  }

  if (dawSystemFeatureFlagResponse.state === 'error') {
    throw new Error(dawSystemFeatureFlagResponse.error)
  }

  const noteDetailsResponse = await getNoteDetails({
    patientId: profileResponse.data.id,
    sectionName: [
      NoteSectionName.NoteSectionGad7,
      NoteSectionName.NoteSectionPhq9,
      NoteSectionName.NoteSectionPcl5,
      NoteSectionName.NoteSectionAudit,
      NoteSectionName.NoteSectionDast10,
      NoteSectionName.NoteSectionHamD,
    ],
  })

  if (noteDetailsResponse.state === 'error') {
    throw new Error(noteDetailsResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <Box className="mx-auto w-[1200px]">
          <PreCheckinAssessmentStapper
            insurancePayers={insurancePayerResponse.data}
            patientInsurances={patientInsurancesResponse.data}
            creditCards={creditCardsResponse.data}
            stripeAPIKey={STRIPE_PUBLISHABLE_KEY}
            pharmacies={pharmaciesResponse.data}
            isDawSystemFeatureFlagEnabled={dawSystemFeatureFlagResponse.data}
            questionnaireData={noteDetailsResponse.data}
          />
        </Box>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export { PreCheckinAssessmentView }

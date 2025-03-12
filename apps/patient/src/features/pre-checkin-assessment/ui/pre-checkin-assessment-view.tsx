import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
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
import { NoteStoreProvider } from '@/features/note/store'
import { getPatientPharmacies } from '@/features/pharmacy/api'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'
import { PreCheckinAssessmentStapper } from './pre-checkin-assessment-stepper/pre-checkin-assessment-stapper'
import { questionnairesToShowOnPreCheckin } from './pre-checkin-assessment-stepper/steps/questionnaire/utils'

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
      CODESETS.DelusionType,
      CODESETS.HallucinationType,
      CODESETS.Relationship,
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

  const questionnaireDashboardResponse = await getNoteDetails({
    patientId: profileResponse.data.id,
    sectionName: [NoteSectionName.NoteSectionDashboard],
  })

  if (questionnaireDashboardResponse.state === 'error') {
    throw new Error(questionnaireDashboardResponse.error)
  }

  const questionnaireSectionsToShowOnPreCheckin =
    questionnairesToShowOnPreCheckin(questionnaireDashboardResponse.data)

  const noteDetailsResponse = await getNoteDetails({
    patientId: profileResponse.data.id,
    sectionName: [
      ...questionnaireSectionsToShowOnPreCheckin,
      NoteSectionName.NoteSectionHPI,
      NoteSectionName.NoteSectionReviewOfSystem,
      NoteSectionName.NoteSectionFamilyPsychHx,
      NoteSectionName.NoteSectionSubstanceUseHx,
      NoteSectionName.NoteSectionPastPsychHx,
      NoteSectionName.NoteSectionSocialHx,
      NoteSectionName.NoteSectionPastMedicalHx,
    ],
  })

  if (noteDetailsResponse.state === 'error') {
    throw new Error(noteDetailsResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <CodesetStoreProvider codesets={codesets}>
          <NoteStoreProvider notes={noteDetailsResponse.data}>
          <Box className="mx-auto w-[1200px]">
            <PreCheckinAssessmentStapper
              insurancePayers={insurancePayerResponse.data}
              patientInsurances={patientInsurancesResponse.data}
              creditCards={creditCardsResponse.data}
              stripeAPIKey={STRIPE_PUBLISHABLE_KEY}
              pharmacies={pharmaciesResponse.data}
              isDawSystemFeatureFlagEnabled={true} //Currently we have to remove DAW system feature flag dependency
              questionnaireSectionsToShowOnPreCheckin={
                questionnaireSectionsToShowOnPreCheckin
              }
            />
          </Box>
        </NoteStoreProvider>
      </CodesetStoreProvider>
      </GooglePlacesContextProvider>
    </ProfileStoreProvider>
  )
}

export { PreCheckinAssessmentView }

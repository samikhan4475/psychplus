import { CODESETS } from '@psychplus-v2/constants'
import { Box, Text } from '@radix-ui/themes'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { getCodesets, getIsFeatureFlagEnabled, getProfile } from '@/api'
import { FeatureFlags } from '@/constants'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { getCreditCards } from '@/features/billing/credit-debit-cards/api'
import {
  getInsurancePayers,
  getPatientInsurances,
} from '@/features/billing/payments/api'
import {
  getPatientAllergies,
  getPatientMedications,
} from '@/features/medications/api'
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
    patientMedicationsResponse,
    patientAllergiesResponse,
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
    getPatientMedications(),
    getPatientAllergies(),
  ])

  if (insurancePayerResponse.state === 'error') {
    return <Text>{insurancePayerResponse.error}</Text>
  }

  if (patientInsurancesResponse.state === 'error') {
    return <Text>{patientInsurancesResponse.error}</Text>
  }

  if (creditCardsResponse.state === 'error') {
    return <Text>{creditCardsResponse.error}</Text>
  }

  if (profileResponse.state === 'error') {
    return <Text>{profileResponse.error}</Text>
  }

  if (pharmaciesResponse.state === 'error') {
    return <Text>{pharmaciesResponse.error}</Text>
  }

  if (dawSystemFeatureFlagResponse.state === 'error') {
    return <Text>{dawSystemFeatureFlagResponse.error}</Text>
  }

  if (patientMedicationsResponse.state === 'error') {
    return <Text>{patientMedicationsResponse.error}</Text>
  }

  if (patientAllergiesResponse.state === 'error') {
    return <Text>{patientAllergiesResponse.error}</Text>
  }

  const questionnaireDashboardResponse = await getNoteDetails({
    patientId: profileResponse.data.id,
    sectionName: [NoteSectionName.NoteSectionDashboard],
  })

  if (questionnaireDashboardResponse.state === 'error') {
    return <Text>{questionnaireDashboardResponse.error}</Text>
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
    return <Text>{noteDetailsResponse.error}</Text>
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
              medications={patientMedicationsResponse.data}
              allergies={patientAllergiesResponse.data}
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

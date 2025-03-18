import { CODESETS, UserSettingName } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY, STRIPE_PUBLISHABLE_KEY } from '@psychplus-v2/env'
import { extractUserSetting } from '@psychplus-v2/utils'
import { Box, Text } from '@radix-ui/themes'
import { getCodesets, getIsFeatureFlagEnabled, getProfile } from '@/api'
import { FeatureFlags } from '@/constants'
import { getUserSettings } from '@/features/account/profile/api'
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
    // dawSystemFeatureFlagResponse,
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
    // getIsFeatureFlagEnabled(FeatureFlags.ehr8973EnableDawMedicationApi), commenting this out for 2nd phase
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

  const pharmacies =
    pharmaciesResponse.state === 'error' ? [] : pharmaciesResponse.data
  const medications =
    patientMedicationsResponse.state === 'error'
      ? []
      : patientMedicationsResponse.data
  const allergies =
    patientAllergiesResponse.state === 'error'
      ? []
      : patientAllergiesResponse.data

  const questionnaireDashboardResponse = await getNoteDetails({
    patientId: profileResponse.data.id,
    sectionName: [NoteSectionName.NoteSectionDashboard],
  })

  if (questionnaireDashboardResponse.state === 'error') {
    return <Text>{questionnaireDashboardResponse.error}</Text>
  }

  const questionnaireSectionsToShowOnPreCheckin =
    questionnairesToShowOnPreCheckin(questionnaireDashboardResponse.data)

  const [noteDetailsResponse, userSettingsResponse] = await Promise.all([
    getNoteDetails({
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
    }),
    getUserSettings(profileResponse.data.id),
  ])

  if (noteDetailsResponse.state === 'error') {
    return <Text>{noteDetailsResponse.error}</Text>
  }

  if (userSettingsResponse.state === 'error') {
    return <Text>{userSettingsResponse.error}</Text>
  }

  const preCheckInProgress = extractUserSetting(
    userSettingsResponse.data,
    UserSettingName.PreCheckIn,
  )

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <CodesetStoreProvider codesets={codesets}>
          <NoteStoreProvider notes={noteDetailsResponse.data}>
            <Box className="mx-auto w-[1200px]" mt="9">
              <PreCheckinAssessmentStapper
                insurancePayers={insurancePayerResponse.data}
                patientInsurances={patientInsurancesResponse.data}
                creditCards={creditCardsResponse.data}
                stripeAPIKey={STRIPE_PUBLISHABLE_KEY}
                pharmacies={pharmacies}
                medications={medications}
                allergies={allergies}
                isDawSystemFeatureFlagEnabled={true} //Currently we have to remove DAW system feature flag dependency
                questionnaireSectionsToShowOnPreCheckin={
                  questionnaireSectionsToShowOnPreCheckin
                }
                preCheckInProgress={{
                  preCheckInCompletedTabs:
                    preCheckInProgress?.content?.preCheckInCompletedTabs,
                  isPreCheckInCompleted:
                    preCheckInProgress?.content?.isPreCheckInCompleted,
                  activeTab: preCheckInProgress?.content?.activeTab,
                  id: String(preCheckInProgress?.id),
                }}
              />
            </Box>
          </NoteStoreProvider>
        </CodesetStoreProvider>
      </GooglePlacesContextProvider>
    </ProfileStoreProvider>
  )
}

export { PreCheckinAssessmentView }

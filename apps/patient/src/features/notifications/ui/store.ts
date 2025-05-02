import { CODESETS, UserSettingName } from '@psychplus-v2/constants'
import { extractUserSetting } from '@psychplus-v2/utils'
import { create } from 'zustand'
import {
  getCodeSetsAction,
  getConsentsAction,
  getProfileAction,
} from '@/actions'
import { getUserSettingsAction } from '@/features/account/profile/actions'
import { getCreditCardsAction } from '@/features/billing/credit-debit-cards/actions/get-credit-cards'
import {
  getInsurancePayersAction,
  getPatientInsurancesAction,
} from '@/features/billing/payments/actions'
import {
  getPatientAllergiesAction,
  getPatientMedicationsAction,
} from '@/features/medications/actions'
import { getNoteDetails } from '@/features/note/actions'
import { NoteSectionName } from '@/features/note/constants'
import { getPatientPharmaciesAction } from '@/features/pharmacy/actions'
import { questionnairesToShowOnPreCheckin } from '@/features/pre-checkin-assessment/ui/steps'
import { AssessmentStateType, ErrorType } from '../types'

interface Store {
  isDialogOpen: boolean
  initialDataLoading: boolean
  initialDataState: Partial<AssessmentStateType>
  setIsDialogOpen: (state: boolean) => void
  getInitialData: () => ErrorType | void
}

const useStore = create<Store>()((set) => ({
  isDialogOpen: false,
  initialDataLoading: true,
  initialDataState: {},
  getInitialData: async () => {
    set({ initialDataLoading: true })
    const [creditCardResponse, profileResponse, userConsentsResponse] =
      await Promise.all([
        getCreditCardsAction(),
        getProfileAction(),
        getConsentsAction(),
      ])
    if (profileResponse.state === 'error') {
      return {
        title: profileResponse.error,
        type: 'error',
      }
    }

    if (creditCardResponse.state === 'error') {
      return {
        title: creditCardResponse.error,
        type: 'error',
      }
    }

    if (userConsentsResponse.state === 'error') {
      return {
        title: userConsentsResponse.error,
        type: 'error',
      }
    }

    const [
      insurancePayerResponse,
      patientInsurancesResponse,
      userSettingsResponse,
    ] = await Promise.all([
      getInsurancePayersAction(),
      getPatientInsurancesAction(),
      getUserSettingsAction(profileResponse.data.id),
    ])

    if (userSettingsResponse.state === 'error') {
      return {
        title: userSettingsResponse.error,
        type: 'error',
      }
    }
    if (insurancePayerResponse.state === 'error') {
      return {
        title: insurancePayerResponse.error,
        type: 'error',
      }
    }

    if (patientInsurancesResponse.state === 'error') {
      return {
        title: patientInsurancesResponse.error,
        type: 'error',
      }
    }

    const [
      questionnaireDashboardResponse,
      pharmaciesResponse,
      // dawSystemFeatureFlagResponse,
      patientMedicationsResponse,
      patientAllergiesResponse,
    ] = await Promise.all([
      getNoteDetails({
        patientId: profileResponse.data.id,
        sectionName: [NoteSectionName.NoteSectionDashboard],
      }),
      getPatientPharmaciesAction(),
      getPatientMedicationsAction(),
      getPatientAllergiesAction(),
    ])
    if (questionnaireDashboardResponse.state === 'error') {
      return {
        title: questionnaireDashboardResponse.error,
        type: 'error',
      }
    }
    const codesets = await getCodeSetsAction([
      CODESETS.InsuranceRelationship,
      CODESETS.Gender,
      CODESETS.UsStates,
      CODESETS.InsurancePolicyPriority,
      CODESETS.DelusionType,
      CODESETS.HallucinationType,
      CODESETS.Relationship,
    ])
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
        NoteSectionName.NoteSectionDiagnosis,
      ],
    })

    if (noteDetailsResponse.state === 'error') {
      return {
        title: noteDetailsResponse.error,
        type: 'error',
      }
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

    const preCheckInProgress = extractUserSetting(
      userSettingsResponse.data,
      UserSettingName.PreCheckIn,
    )

    set({
      initialDataLoading: false,
      initialDataState: {
        creditCardResponse: creditCardResponse.data,
        profileResponse: profileResponse.data,
        userConsentsResponse: userConsentsResponse.data,
        insurancePayerResponse: insurancePayerResponse.data,
        patientInsurancesResponse: patientInsurancesResponse.data,
        questionnaireDashboardResponse: questionnaireDashboardResponse.data,
        pharmaciesResponse: pharmacies,
        patientMedicationsResponse: medications,
        patientAllergiesResponse: allergies,
        questionnaireSectionsToShowOnPreCheckin,
        preCheckInProgress: {
          preCheckInCompletedTabs:
            preCheckInProgress?.content?.preCheckInCompletedTabs,
          isPreCheckInCompleted:
            preCheckInProgress?.content?.isPreCheckInCompleted,
          activeTab: preCheckInProgress?.content?.activeTab,
          id: String(preCheckInProgress?.id),
        },
        notes: noteDetailsResponse.data,
        codesets,
      },
    })
  },
  setIsDialogOpen: (value) => set({ isDialogOpen: value }),
}))

export { useStore }

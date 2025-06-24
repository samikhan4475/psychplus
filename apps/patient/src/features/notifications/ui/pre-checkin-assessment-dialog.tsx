'use client'

import { useEffect } from 'react'
import { Dialog, Flex, Text } from '@radix-ui/themes'
import {
  Badge,
  CloseDialogIcon,
  FileLineIcon,
  LoadingPlaceholder,
} from '@/components-v2'
import { ProfileStoreProvider } from '@/features/account/profile/store'
import { NoteStoreProvider } from '@/features/note/store'
import { PreCheckinAssessmentView } from '@/features/pre-checkin-assessment'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { getTabsToShow } from '@/features/pre-checkin-assessment/utils'
import { CodesetStoreProvider, useToast } from '@/providers'
import { useStore as useNotificationStore } from './store'

interface PreCheckinAssessmentDialogProps {
  stripeApiKey: string
}

const PreCheckinAssessmentDialog = ({
  stripeApiKey,
}: PreCheckinAssessmentDialogProps) => {
  const { toast } = useToast()

  const {
    isPreCheckInCompleted,
    setActiveTab,
    setShowCompletionScreen,
    completedTabs,
    showCompletionScreen,
    tabsToShow,
  } = useStore((state) => ({
    isPreCheckInCompleted: state.isPreCheckInCompleted,
    showCompletionScreen: state.showCompletionScreen,
    setShowCompletionScreen: state.setShowCompletionScreen,
    tabsToShow: state.tabsToShow,
    completedTabs: state.completedTabs,
    setActiveTab: state.setActiveTab,
  }))
  const {
    initialDataLoading,
    initialDataState,
    getInitialData,
    isDialogOpen,
    setIsDialogOpen,
  } = useNotificationStore((state) => ({
    initialDataLoading: state.initialDataLoading,
    initialDataState: state.initialDataState,
    getInitialData: state.getInitialData,
    isDialogOpen: state.isDialogOpen,
    setIsDialogOpen: state.setIsDialogOpen,
  }))

  useEffect(() => {
    ;(async () => {
      if (!isDialogOpen) return
      const result = await getInitialData()
      if (result?.type === 'error') {
        toast({ title: result.title, type: result.type })
      }
    })()
  }, [isDialogOpen])
  const completed =
    isPreCheckInCompleted ??
    initialDataState?.preCheckInProgress?.isPreCheckInCompleted

  const {
    notes,
    codesets,
    patientAllergiesResponse,
    creditCardResponse,
    insurancePayerResponse,
    patientMedicationsResponse,
    pharmaciesResponse,
    profileResponse,
    questionnaireDashboardResponse,
    userConsentsResponse,
    questionnaireSectionsToShowOnPreCheckin,
    preCheckInProgress,
    patientInsurancesResponse,
  } = initialDataState || {}

  if (!isDialogOpen) return <></>

  const isLoading =
    !profileResponse ||
    !notes ||
    !codesets ||
    !patientAllergiesResponse ||
    !creditCardResponse ||
    !insurancePayerResponse ||
    !patientMedicationsResponse ||
    !pharmaciesResponse ||
    !profileResponse ||
    !questionnaireDashboardResponse ||
    !userConsentsResponse ||
    !questionnaireSectionsToShowOnPreCheckin ||
    !preCheckInProgress ||
    !pharmaciesResponse ||
    !patientMedicationsResponse ||
    !creditCardResponse ||
    !patientInsurancesResponse ||
    initialDataLoading

  if (isLoading) {
    return (
      <Dialog.Root
        onOpenChange={(open) => setIsDialogOpen(open)}
        open={initialDataLoading}
      >
        <Dialog.Content className="relative flex h-[700px] max-w-[1200px] flex-col overflow-hidden p-3 md:p-6">
          <CloseDialogIcon />
          <LoadingPlaceholder containerClassName="mx-auto my-auto" />
        </Dialog.Content>
      </Dialog.Root>
    )
  }
  const onDialogOpen = (open: boolean) => {
    setIsDialogOpen(open)
    if (open === false) setShowCompletionScreen(false)
    if (open === true) {
      const tabs =
        tabsToShow.length > 0
          ? tabsToShow
          : getTabsToShow({
              tabs: Object.values(PreCheckinAssessmentTabs),
              questionnaireSectionsToShowOnPreCheckin,
            })

      const firstEmptyTab = tabs?.find(
        (tab) => !completedTabs?.includes(tab as PreCheckinAssessmentTabs),
      )
      const initialTab =
        completed || !preCheckInProgress.activeTab
          ? PreCheckinAssessmentTabs.Questionnaire
          : preCheckInProgress.activeTab

      setActiveTab((firstEmptyTab as PreCheckinAssessmentTabs) ?? initialTab)
    }
  }
  return (
    <ProfileStoreProvider profile={profileResponse}>
      <CodesetStoreProvider codesets={codesets}>
        <NoteStoreProvider notes={notes}>
          <Flex gap="2" align="center">
            <FileLineIcon />
            <Text className="text-[12px] xs:text-[15px]">
              Pre-Visit Assessment
            </Text>
            <Badge
              label={completed ? 'Completed' : 'Not Completed'}
              type={completed ? 'success' : 'warning'}
              addIcon={true}
              className="h-8 text-[14px]"
            />
            <Dialog.Root open={isDialogOpen} onOpenChange={onDialogOpen}>
              <Dialog.Content className="relative flex h-[700px] max-w-[1200px] flex-col overflow-hidden">
                <CloseDialogIcon />
                {!showCompletionScreen && (
                  <Dialog.Title className="font-sans -tracking-[0.25px]">
                    Pre Check-in Assessment
                  </Dialog.Title>
                )}
                <PreCheckinAssessmentView
                  insurancePayers={insurancePayerResponse}
                  patientInsurances={patientInsurancesResponse}
                  creditCards={creditCardResponse}
                  stripeAPIKey={stripeApiKey}
                  pharmacies={pharmaciesResponse}
                  medications={patientMedicationsResponse}
                  allergies={patientAllergiesResponse}
                  isDawSystemFeatureFlagEnabled={true} //Currently we have to remove DAW system feature flag dependency
                  questionnaireSectionsToShowOnPreCheckin={
                    questionnaireSectionsToShowOnPreCheckin
                  }
                  preCheckInProgress={{
                    preCheckInCompletedTabs:
                      preCheckInProgress?.preCheckInCompletedTabs,
                    isPreCheckInCompleted:
                      preCheckInProgress?.isPreCheckInCompleted,
                    activeTab: preCheckInProgress?.activeTab,
                    id: String(preCheckInProgress?.id),
                  }}
                />
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </NoteStoreProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export { PreCheckinAssessmentDialog }

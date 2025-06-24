'use client'

import { Badge, CloseDialogIcon, FileLineIcon } from '@/components-v2'
import { NoteStoreProvider } from '@/features/note/store'
import { NoteSectionItem } from '@/features/note/types'
import { PreCheckinAssessmentView } from '@/features/pre-checkin-assessment'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { PreCheckinAssessmentStapperProps } from '@/features/pre-checkin-assessment/types'
import { getTabsToShow } from '@/features/pre-checkin-assessment/utils'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { ChevronRightIcon } from 'lucide-react'

const UpcomingSummaryPreVisitAssessment = ({
  insurancePayers,
  patientInsurances,
  creditCards,
  stripeAPIKey,
  pharmacies,
  medications,
  allergies,
  notes,
  questionnaireSectionsToShowOnPreCheckin,
  preCheckInProgress,
}: PreCheckinAssessmentStapperProps & { notes: NoteSectionItem[] }) => {
  const {
    isPreCheckInCompleted,
    showCompletionScreen,
    setShowCompletionScreen,
    tabsToShow,
    completedTabs,
    setActiveTab,
  } = useStore()
  const completed =
    isPreCheckInCompleted ?? preCheckInProgress?.isPreCheckInCompleted

  return (
    <NoteStoreProvider notes={notes}>
      <Flex gap={{ initial: '3', sm: '2' }} align={{ initial: 'start', sm: 'center' }} direction={{ initial: 'column', sm: 'row' }}>
        <Flex align="center" gap="2">
          <FileLineIcon />
          <Text className="text-[12px] xs:text-[15px]">Pre-Visit Assessment</Text>
        </Flex>
        <Badge
          label={completed ? 'Completed' : 'Not Completed'}
          type={completed ? 'success' : 'warning'}
          addIcon={true}
          className="h-8 text-[14px]"
        />
        <Dialog.Root
          onOpenChange={(open) => {
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
                (tab) =>
                  !completedTabs?.includes(tab as PreCheckinAssessmentTabs),
              )
              const initialTab =
                completed || !preCheckInProgress.activeTab
                  ? PreCheckinAssessmentTabs.PatientInfo
                  : preCheckInProgress.activeTab

              setActiveTab(
                (firstEmptyTab as PreCheckinAssessmentTabs) ?? initialTab,
              )
            }
          }}
        >
          <Dialog.Trigger>
            <Button highContrast className="bg-[#194595]" radius="full">
              <Flex gap="1" align="center">
                <Text className="whitespace-nowrap text-[11px] xs:text-[15px]">
                  {completed ? 'Edit' : 'Fill Now'}
                </Text>
                <ChevronRightIcon height="16" width="16" />
              </Flex>
            </Button>
          </Dialog.Trigger>

          <Dialog.Content className="relative flex h-[700px] max-w-[1200px] flex-col overflow-hidden  p-3 md:p-6">
            <CloseDialogIcon />
            {!showCompletionScreen && (
              <Dialog.Title className="font-sans -tracking-[0.25px] mt-3 md:mt-0 text-[18px] sm:text-[20px]">
                Pre Check-in Assessment
              </Dialog.Title>
            )}
            <PreCheckinAssessmentView
              insurancePayers={insurancePayers}
              patientInsurances={patientInsurances}
              creditCards={creditCards}
              stripeAPIKey={stripeAPIKey}
              pharmacies={pharmacies}
              medications={medications}
              allergies={allergies}
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
  )
}

export { UpcomingSummaryPreVisitAssessment }

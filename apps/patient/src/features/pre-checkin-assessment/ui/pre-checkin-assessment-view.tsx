'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import {
  PreCheckinAssessmentStapperProps,
  PreCheckinAssessmentTab,
} from '@/features/pre-checkin-assessment/types'
import { getTabsToShow } from '@/features/pre-checkin-assessment/utils'
import { PreCheckinAssessmentFooter } from './shared-blocks/pre-checkin-assessment-footer'
import { PreCheckinAssessmentHeader } from './shared-blocks/pre-checkin-assessment-header'
import { PreCheckInCompletion } from './shared-blocks/pre-checkin-completion'
import {
  AllergiesAndMedications,
  HistoriesView,
  InsuranceView,
  PatientInfo,
  PaymentView,
  PharmacyView,
  PresentingSymptoms,
  QuestionnaireView,
  ReviewOfSystems,
} from './steps'

const PreCheckinAssessmentView = ({
  insurancePayers,
  patientInsurances,
  creditCards,
  stripeAPIKey,
  pharmacies,
  medications,
  allergies,
  isDawSystemFeatureFlagEnabled,
  questionnaireSectionsToShowOnPreCheckin,
  preCheckInProgress,
}: PreCheckinAssessmentStapperProps) => {
  const {
    activeTab,
    hydrated,
    setTabsToShow,
    tabsToShow,
    setActiveTab,
    setCompletedTabs,
    setIsPreCheckInCompleted,
    setPreCheckInSettingsId,
    preCheckInSettingsId,
    showCompletionScreen,
  } = useStore()

  useEffect(() => {
    if (preCheckInSettingsId) return
    setIsPreCheckInCompleted(preCheckInProgress?.isPreCheckInCompleted)
    setCompletedTabs(preCheckInProgress?.preCheckInCompletedTabs ?? [])
    setActiveTab(
      preCheckInProgress?.activeTab ?? PreCheckinAssessmentTabs.PatientInfo,
    )
    setPreCheckInSettingsId(preCheckInProgress?.id)
  }, [preCheckInProgress])

  useEffect(() => {
    const tabs = getTabsToShow({
      tabs: Object.values(PreCheckinAssessmentTabs),
      questionnaireSectionsToShowOnPreCheckin,
    })

    if (!tabs.includes(activeTab))
      setActiveTab(PreCheckinAssessmentTabs.PatientInfo)

    setTabsToShow(tabs as PreCheckinAssessmentTabs[])
  }, [questionnaireSectionsToShowOnPreCheckin])

  if (!hydrated) return

  const tabs: PreCheckinAssessmentTab[] = [
    {
      id: PreCheckinAssessmentTabs.PatientInfo,
      content: <PatientInfo />,
    },
    {
      id: PreCheckinAssessmentTabs.Insurance,
      content: (
        <InsuranceView
          insurancePayers={insurancePayers}
          patientInsurances={patientInsurances}
        />
      ),
    },
    {
      id: PreCheckinAssessmentTabs.Payment,
      content: (
        <PaymentView creditCards={creditCards} stripeApiKey={stripeAPIKey} />
      ),
    },
    {
      id: PreCheckinAssessmentTabs.AllergiesAndMedications,
      content: (
        <AllergiesAndMedications
          medications={medications}
          allergies={allergies}
        />
      ),
    },
    {
      id: PreCheckinAssessmentTabs.Pharmacy,
      content: (
        <PharmacyView
          pharmacies={pharmacies}
          isDawSystemFeatureFlagEnabled={isDawSystemFeatureFlagEnabled}
        />
      ),
    },
    {
      id: PreCheckinAssessmentTabs.PresentingSymptomsHPI,
      content: <PresentingSymptoms />,
    },
    {
      id: PreCheckinAssessmentTabs.Histories,
      content: <HistoriesView />,
    },
    {
      id: PreCheckinAssessmentTabs.ReviewOfSystems,
      content: <ReviewOfSystems />,
    },
    {
      id: PreCheckinAssessmentTabs.Questionnaire,
      content: (
        <QuestionnaireView
          questionnaireSectionsToShowOnPreCheckin={
            questionnaireSectionsToShowOnPreCheckin
          }
        />
      ),
    },
  ].filter((tab) => tabsToShow.includes(tab.id))

  return (
    <>
      {showCompletionScreen ? (
        <PreCheckInCompletion />
      ) : (
        <>
          <Tabs.Root value={activeTab} className="flex flex-grow flex-col">
            <Box className="flex-shrink-0" mt="5">
              <PreCheckinAssessmentHeader tabs={tabs} />
            </Box>

            <Flex
              className="h-[400px] flex-grow overflow-y-auto"
              direction="column"
              mt="6"
              pr="2"
            >
              {tabs.find((tab) => tab.id === activeTab)?.content}
            </Flex>
          </Tabs.Root>

          <Box className="flex-shrink-0" pt="6">
            <PreCheckinAssessmentFooter />
          </Box>
        </>
      )}
    </>
  )
}

export { PreCheckinAssessmentView }

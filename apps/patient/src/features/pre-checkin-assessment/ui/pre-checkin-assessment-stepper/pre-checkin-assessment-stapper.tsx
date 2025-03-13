'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Text } from '@radix-ui/themes'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import {
  AllergyDataResponse,
  PatientMedication,
} from '@/features/medications/types'
import { NoteSectionName } from '@/features/note/constants'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { PreCheckinAssessmentTab } from '@/features/pre-checkin-assessment/types'
import { getTabsToShow } from '@/features/pre-checkin-assessment/utils'
import { PreCheckinAssessmentFooter } from './shared-blocks/pre-checkin-assessment-footer'
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
import { PreCheckinAssessmentHeader } from './shared-blocks/pre-checkin-assessment-header'

interface PreCheckinAssessmentStapperProps {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
  creditCards: CreditCard[]
  stripeAPIKey: string
  pharmacies: PatientPharmacy[]
  medications: PatientMedication[]
  allergies: AllergyDataResponse[]
  isDawSystemFeatureFlagEnabled: boolean
  questionnaireSectionsToShowOnPreCheckin: NoteSectionName[]
}

const PreCheckinAssessmentStapper = ({
  insurancePayers,
  patientInsurances,
  creditCards,
  stripeAPIKey,
  pharmacies,
  medications,
  allergies,
  isDawSystemFeatureFlagEnabled,
  questionnaireSectionsToShowOnPreCheckin,
}: PreCheckinAssessmentStapperProps) => {
  const { activeTab, hydrated, setTabsToShow, tabsToShow, setActiveTab } =
    useStore()

  useEffect(() => {
    const tabs = getTabsToShow({
      tabs: Object.values(PreCheckinAssessmentTabs),
      questionnaireSectionsToShowOnPreCheckin,
    })

    if (!tabs.includes(activeTab))
      setActiveTab(tabs[0] as PreCheckinAssessmentTabs)

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
      <Box className="py-8">
        <Text
          className="mx-auto flex justify-center pb-6 font-[600] text-[#151b4a]"
          size="5"
        >
          Pre Check-in Assessment
        </Text>
        <Tabs.Root value={activeTab} className="w-full">
          <PreCheckinAssessmentHeader tabs={tabs} />
          <Tabs.Content className="mt-6 pb-28" value={activeTab}>
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </Tabs.Content>
        </Tabs.Root>
      </Box>
      <PreCheckinAssessmentFooter />
    </>
  )
}

export { PreCheckinAssessmentStapper }

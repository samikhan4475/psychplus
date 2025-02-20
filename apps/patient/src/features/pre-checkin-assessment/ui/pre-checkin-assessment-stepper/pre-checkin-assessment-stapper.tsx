'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Text } from '@radix-ui/themes'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import { NoteSectionItem } from '@/features/note/types'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { PreCheckinAssessmentTabs } from '@/features/pre-checkin-assessment/constants'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { PreCheckinAssessmentTab } from '@/features/pre-checkin-assessment/types'
import { filterTabs } from '@/features/pre-checkin-assessment/utils'
import { PreCheckinAssessmentFooter } from '../pre-checkin-assessment-footer'
import { PreCheckinAssessmentHeader } from '../pre-checkin-assessment-header'
import {
  AddInsurance,
  AllergiesAndMedications,
  Histories,
  PatientInfo,
  Payment,
  Pharmacy,
  PresentingSymptoms,
  QuestionnaireView,
  ReviewOfSystems,
} from './steps'

type PreCheckinAssessmentStapperProps = {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
  creditCards: CreditCard[]
  stripeAPIKey: string
  pharmacies: PatientPharmacy[]
  isDawSystemFeatureFlagEnabled?: boolean
  questionnaireData: NoteSectionItem[]
}

const PreCheckinAssessmentStapper = ({
  insurancePayers,
  patientInsurances,
  creditCards,
  stripeAPIKey,
  pharmacies,
  isDawSystemFeatureFlagEnabled,
  questionnaireData,
}: PreCheckinAssessmentStapperProps) => {
  const {
    activeTab,
    hydrated,
    setIsDawSystemFeatureFlagEnabled,
    setPharmacies,
  } = useStore()

  useEffect(() => {
    setPharmacies(pharmacies)
    setIsDawSystemFeatureFlagEnabled(isDawSystemFeatureFlagEnabled)
  }, [pharmacies, isDawSystemFeatureFlagEnabled])

  if (!hydrated) return

  let tabs: PreCheckinAssessmentTab[] = [
    {
      id: PreCheckinAssessmentTabs.PatientInfo,
      content: <PatientInfo />,
    },
    {
      id: PreCheckinAssessmentTabs.Insurance,
      content: (
        <AddInsurance
          insurancePayers={insurancePayers}
          patientInsurances={patientInsurances}
        />
      ),
    },
    {
      id: PreCheckinAssessmentTabs.Payment,
      content: (
        <Payment creditCards={creditCards} stripeApiKey={stripeAPIKey} />
      ),
    },
    {
      id: PreCheckinAssessmentTabs.AllergiesAndMedications,
      content: <AllergiesAndMedications />,
    },
    {
      id: PreCheckinAssessmentTabs.Pharmacy,
      content: (
        <Pharmacy
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
      content: <Histories />,
    },
    {
      id: PreCheckinAssessmentTabs.ReviewOfSystems,
      content: <ReviewOfSystems />,
    },
    {
      id: PreCheckinAssessmentTabs.Questionnaire,
      content: <QuestionnaireView data={questionnaireData} />,
    },
  ]

  tabs = filterTabs({ tabs, pharmacies, isDawSystemFeatureFlagEnabled })

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

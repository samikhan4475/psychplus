'use client'

import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { CreditCard } from '@/features/billing/credit-debit-cards/types'
import { Insurance, InsurancePayer } from '@/features/billing/payments/types'
import PreCheckinAssessmentFooterButton from './shared-blocks/pre-checkin-assessment-footer-button'
import {
  AddInsurance,
  AllergiesAndMedications,
  Histories,
  PatientInfo,
  Payment,
  Pharmacy,
  PresentingSymptoms,
  Questionnaire,
  ReviewOfSystems,
} from './steps'

const PreCheckinAssessmentStapper = ({
  insurancePayers,
  patientInsurances,
  creditCards,
  stripeAPIKey,
}: {
  insurancePayers: InsurancePayer[]
  patientInsurances: Insurance[]
  creditCards: CreditCard[]
  stripeAPIKey: string
}) => {
  const tabData = [
    { id: 'patient-info', label: 'Patient Info', content: <PatientInfo /> },
    {
      id: 'insurance',
      label: 'Insurance',
      content: (
        <AddInsurance
          insurancePayers={insurancePayers}
          patientInsurances={patientInsurances}
        />
      ),
    },
    {
      id: 'payment',
      label: 'Payment',
      content: (
        <Payment creditCards={creditCards} stripeApiKey={stripeAPIKey} />
      ),
    },
    {
      id: 'allergies',
      label: 'Allergies/ Medications',
      content: <AllergiesAndMedications />,
    },
    { id: 'pharmacy', label: 'Pharmacy', content: <Pharmacy /> },
    {
      id: 'presenting-symptoms-HPI',
      label: 'Presenting symptoms (HPI)',
      content: <PresentingSymptoms />,
    },
    { id: 'histories', label: 'Histories', content: <Histories /> },
    {
      id: 'review-of-Systems',
      label: 'Review  of Systems',
      content: <ReviewOfSystems />,
    },
    { id: 'questionnaire', label: 'Questionnaire', content: <Questionnaire /> },
  ]
  const [completedTabs, setCompletedTabs] = useState<string[]>(['patient-info'])
  const [activeTab, setActiveTab] = useState('patient-info')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (!completedTabs.includes(value)) {
      setCompletedTabs([...completedTabs, value])
    }
  }
  const handleNext = () => {
    const currentIndex = tabData.findIndex((tab) => tab.id === activeTab)
    if (currentIndex < tabData.length - 1) {
      handleTabChange(tabData[currentIndex + 1].id)
    }
  }

  const handleBack = () => {
    const currentIndex = tabData.findIndex((tab) => tab.id === activeTab)
    if (currentIndex > 0) {
      handleTabChange(tabData[currentIndex - 1].id)
    }
  }

  const getTabTriggerColor = (
    activeTab: string,
    tabId: string,
    completedTabs: string[],
  ) => {
    if (activeTab === tabId) return 'bg-[#194595]'
    if (completedTabs.includes(tabId)) return 'bg-[#24366b]'
    return 'bg-[#d1daea]'
  }

  const getTabIndicatorColor = (
    activeTab: string,
    tabId: string,
    completedTabs: string[],
  ) => {
    if (activeTab === tabId) {
      return 'border-[6px] border-[#24366B]'
    }
    if (completedTabs.includes(tabId)) {
      return 'bg-[#24366B] border-[#24366B]'
    }
    return ''
  }

  const getTabLabelColor = (
    activeTab: string,
    tabId: string,
    completedTabs: string[],
  ) => {
    if (activeTab === tabId) {
      return 'text-[#1C2024]'
    }
    if (completedTabs.includes(tabId)) {
      return 'text-[#1C2024]'
    }
    return 'text-[#60646c]'
  }

  return (
    <>
      <Box className="py-8">
        <Text className="mx-auto flex justify-center pb-6 text-[32px] font-[600] leading-[40px] text-[#151b4a]">
          Pre Check-in Assessment
        </Text>
        <Flex direction="column" align="center">
          <Tabs.Root
            defaultValue="patient-info"
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full "
          >
            <Tabs.List className="flex w-full gap-3">
              {tabData.map((tab) => (
                <Flex
                  key={tab.id}
                  direction="column"
                  className="flex-1 gap-2"
                  align="center"
                >
                  <Tabs.Trigger
                    value={tab.id}
                    id={tab.id}
                    className={cn(
                      'h-1 w-full cursor-pointer rounded-4',
                      getTabTriggerColor(activeTab, tab.id, completedTabs),
                    )}
                  />
                  <Flex width="100%" gap="1">
                    <Box
                      className={cn(
                        'rounded-full h-[15px] w-[15px] border-[3px] border-[#D1DAEA]',
                        getTabIndicatorColor(activeTab, tab.id, completedTabs),
                      )}
                    ></Box>

                    <Text
                      className={cn(
                        'text-[12px] font-medium',
                        getTabLabelColor(activeTab, tab.id, completedTabs),
                      )}
                    >
                      {tab.label}
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Tabs.List>

            {tabData.map((tab) => (
              <Tabs.Content key={tab.id} value={tab.id} className="mt-6 pb-28">
                {tab.content}
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Flex>
      </Box>
      <PreCheckinAssessmentFooterButton
        activeTab={activeTab}
        onNext={handleNext}
        onBack={handleBack}
      />
    </>
  )
}

export { PreCheckinAssessmentStapper }

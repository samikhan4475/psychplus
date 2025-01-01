'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { TabsTrigger } from '@/components'
import {
  CreditCard,
  Insurance,
  InsurancePayer,
  PatientConsent,
  PatientPreferredPartner,
  PatientProfile,
  Relationship,
} from '@/types'
import {
  INSURANCE_TAB,
  PATIENT_INFO_HISTORY_TAB,
  PATIENT_INFO_TAB,
  PAYMENT_CARDS_TAB,
  PAYMENT_HISTORY_TAB,
  POLICY_AND_CONSENTS_TAB,
} from './constants'
import { InsuranceTab } from './insurance-tab'
import { PatientInfoHistoryTab } from './patient-info-history-tab'
import { PatientInfoTab } from './patient-info-tab'
import { PaymentCardsTab } from './payment-card-tab'
import { PaymentHistoryTab } from './payment-history-tab'
import { PolicyAndConsentsTab } from './policy-and-consents-tab'
import { useStore } from './store'

interface PatientInfoTabsProps {
  patientId: string
  stripeApiKey: string
  googleApiKey: string
  patientProfile: PatientProfile
  patientPreferredPartners: PatientPreferredPartner[]
  patientRelationships: Relationship[]
  patientConsents: PatientConsent[]
  patientCards: CreditCard[]
  insurancePayers: InsurancePayer[]
  patientPolicies: Insurance[]
}

const PatientInfoTabs = ({
  patientId,
  stripeApiKey,
  googleApiKey,
  patientProfile,
  patientPreferredPartners,
  patientRelationships,
  patientConsents,
  patientCards,
  insurancePayers,
  patientPolicies,
}: PatientInfoTabsProps) => {
  const store = useStore()
  const { activeTab, setActiveTab } = zustandUseStore(store, (state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    showPatientHistory: state.showPatientHistory,
  }))

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex className="z-50">
        <Tabs.List>
          <TabsTrigger value={PATIENT_INFO_TAB}>Patient Info</TabsTrigger>
          <TabsTrigger value={INSURANCE_TAB}>Insurance</TabsTrigger>
          <TabsTrigger value={POLICY_AND_CONSENTS_TAB}>
            Policy and Consents
          </TabsTrigger>
          <TabsTrigger value={PAYMENT_HISTORY_TAB}>Payment Hx</TabsTrigger>
          <TabsTrigger value={PAYMENT_CARDS_TAB}>Payment Cards</TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={PATIENT_INFO_TAB}>
        <PatientInfoTab
          patientProfile={patientProfile}
          patientPreferredPartners={patientPreferredPartners}
          patientRelationships={patientRelationships}
          patientConsents={patientConsents}
          googleApiKey={googleApiKey}
          patientId={patientId}
        />
      </TabsContent>
      <TabsContent value={INSURANCE_TAB}>
        <InsuranceTab
          insurancePayers={insurancePayers}
          patientPolicies={patientPolicies}
          patientId={patientId}
          googleApiKey={googleApiKey}
        />
      </TabsContent>
      <TabsContent value={POLICY_AND_CONSENTS_TAB}>
        <PolicyAndConsentsTab
          patientId={patientId}
          patientConsents={patientConsents}
        />
      </TabsContent>
      <TabsContent value={PAYMENT_HISTORY_TAB}>
        <PaymentHistoryTab
          patientId={patientId}
        />
      </TabsContent>
      <TabsContent value={PAYMENT_CARDS_TAB}>
        <PaymentCardsTab
          stripeApiKey={stripeApiKey}
          patientId={patientId}
          googleApiKey={googleApiKey}
          patientCards={patientCards}
        />
      </TabsContent>
      <TabsContent value={PATIENT_INFO_HISTORY_TAB}>
        <PatientInfoHistoryTab />
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const store = useStore()
  const viewedTabs = zustandUseStore(store, (state) => state.viewedTabs)

  return (
    <Tabs.Content
      value={value}
      forceMount={viewedTabs.has(value) ? true : undefined}
      className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { PatientInfoTabs }

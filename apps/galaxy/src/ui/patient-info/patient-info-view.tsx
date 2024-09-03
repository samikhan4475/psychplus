'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import {
  CREDIT_CARD_TAB,
  INSURANCE_TAB,
  PATIENT_INFO_HISTORY_TAB,
  PATIENT_INFO_TAB,
  PAYMENT_HISTORY_TAB,
  POLICY_AND_CONSENTS_TAB,
} from './constants'
import { CreditCardTab } from './credit-card-tab'
import { InsuranceTab } from './insurance-tab'
import { PatientInfoHistoryTab } from './patient-info-history-tab'
import { PatientInfoTab } from './patient-info-tab'
import { PaymentHistoryTab } from './payment-history-tab'
import { PolicyAndConsentsTab } from './policy-and-consents-tab'
import { useStore } from './store'

interface PatientInfoViewProps {
  patientId: string
}

const PatientInfoView = ({ patientId }: PatientInfoViewProps) => {
  const { activeTab, setActiveTab, showPatientHistory, closePatientHistory } =
    useStore((state) => ({
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
      showPatientHistory: state.showPatientHistory,
      closePatientHistory: state.closePatientHistory,
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
          <TabsTrigger value={CREDIT_CARD_TAB}>Credit Card</TabsTrigger>
          {showPatientHistory ? (
            <TabsTrigger
              value={PATIENT_INFO_HISTORY_TAB}
              onClose={closePatientHistory}
            >
              Patient Info Hx
            </TabsTrigger>
          ) : null}
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={PATIENT_INFO_TAB}>
        <PatientInfoTab patientId={patientId} />
      </TabsContent>
      <TabsContent value={INSURANCE_TAB}>
        <InsuranceTab />
      </TabsContent>
      <TabsContent value={POLICY_AND_CONSENTS_TAB}>
        <PolicyAndConsentsTab />
      </TabsContent>
      <TabsContent value={PAYMENT_HISTORY_TAB}>
        <PaymentHistoryTab />
      </TabsContent>
      <TabsContent value={CREDIT_CARD_TAB}>
        <CreditCardTab />
      </TabsContent>
      <TabsContent value={PATIENT_INFO_HISTORY_TAB}>
        <PatientInfoHistoryTab />
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsTrigger = ({
  value,
  children,
  onClose,
}: {
  value: string
  children: React.ReactNode
  onClose?: () => void
}) => (
  <Tabs.Trigger
    value={value}
    className="data-[state=active]:border-b-white data-[state=active]:bg-white border border-l-0 border-accent-6 border-b-gray-5 bg-accent-4 p-0 px-2 py-1 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:font-[600] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
          className="rounded-full hover:text-black h-[18px] w-[18px] cursor-pointer text-gray-11 transition-colors hover:bg-gray-3"
          onPointerDown={(e) => {
            e.preventDefault()
          }}
          onClick={onClose}
        >
          <XIcon width={14} height={14} strokeWidth={1.5} />
        </Flex>
      ) : null}
    </Flex>
  </Tabs.Trigger>
)

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const viewedTabs = useStore((state) => state.viewedTabs)

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

export { PatientInfoView }

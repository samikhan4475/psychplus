'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { ClaimDetailView } from './claim-detail-tab'
import { ClaimTabView } from './claim-tab'
import { InsurancePaymentTabView } from './insurance-payment-tab'
import { PatientStatementsTabView } from './patient-statements-tab'
import { useStore } from './store'
import { SubmissionTabView } from './submission-tab'
import { RevenueCycleTab } from './types'
import { InsurancePaymentDetailView } from './insurance-payment-detail-tab'

const RevenueCycleTabs = () => {
  const { activeTab, closeableTabs, closeTab, setActiveTab } = useStore(
    (state) => ({
      closeableTabs: Array.from(state.closeableTabs),
      activeTab: state.activeTab,
      setActiveTab: state.setActiveTab,
      closeTab: state.closeTab,
    }),
  )

  // Claim# 1234, Check# 1234, tabId is 1234
  const tabId = activeTab?.split(' ')[1]

  return (
    <Box className="flex-1 px-3 pt-4">
      <Tabs.Root
        defaultValue={RevenueCycleTab.Claim}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col w-full"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={RevenueCycleTab.Claim}>
              {RevenueCycleTab.Claim}
            </TabsTrigger>
            <TabsTrigger value={RevenueCycleTab.Submission}>
              {RevenueCycleTab.Submission}
            </TabsTrigger>
            <TabsTrigger value={RevenueCycleTab.ResponseHistory}>
              {RevenueCycleTab.ResponseHistory}
            </TabsTrigger>
            <TabsTrigger value={RevenueCycleTab.InsurancePayment}>
              {RevenueCycleTab.InsurancePayment}
            </TabsTrigger>
            <TabsTrigger value={RevenueCycleTab.PatientStatement}>
              {RevenueCycleTab.PatientStatement}
            </TabsTrigger>
            {closeableTabs.map((tab) => (
              <TabsTrigger onClose={() => closeTab(tab)} key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </Tabs.List>
        </Flex>
        <TabsContent value={RevenueCycleTab.Claim}>
          <ClaimTabView />
        </TabsContent>
        <TabsContent value={RevenueCycleTab.Submission}>
          <SubmissionTabView />
        </TabsContent>
        <TabsContent value={RevenueCycleTab.ResponseHistory}>
          <div>Response History</div>
        </TabsContent>
        <TabsContent value={RevenueCycleTab.InsurancePayment}>
          <InsurancePaymentTabView />
        </TabsContent>
        <TabsContent value={RevenueCycleTab.PatientStatement}>
          <PatientStatementsTabView />
        </TabsContent>
        <TabsContent value={`${RevenueCycleTab.ClaimDetails} ${tabId}`}>
          <ClaimDetailView claimId={tabId} />
        </TabsContent>
        <TabsContent value={`${RevenueCycleTab.CheckDetails} ${tabId}`}>
          <InsurancePaymentDetailView checkId={tabId} />
        </TabsContent>
      </Tabs.Root>
    </Box>
  )
}

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
      forceMount={viewedTabs.has(value) ? true : undefined}
      value={value}
      className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { RevenueCycleTabs }

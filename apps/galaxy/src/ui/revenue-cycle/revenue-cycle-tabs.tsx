'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { ClaimDetailView } from './claim-detail-tab'
import { ClaimTabView } from './claim-tab'
import { InsurancePaymentDetailView } from './insurance-payment-detail-tab'
import { InsurancePaymentTabView } from './insurance-payment-tab'
import { PatientStatementsTabView } from './patient-statements-tab'
import { ResponseHistoryTabView } from './response-history-tab'
import { useStore } from './store'
import { SubmissionTabView } from './submission-tab'
import { RevenueCycleTab } from './types'
import { FileView } from './view-file-tab'

const RevenueCycleTabs = () => {
  const {
    activeTab,
    closeableTabs,
    closeTab,
    setActiveTab,
    selectedPdfFileUrl,
    selectedClaimData,
  } = useStore((state) => ({
    closeableTabs: Array.from(state.closeableTabs),
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    closeTab: state.closeTab,
    selectedPdfFileUrl: state.selectedPdfFileUrl,
    selectedClaimData: state.selectedClaimData,
  }))
  const claimTabsContent = Object.keys(selectedClaimData)
  // Claim# 1234, Check# 1234, tabId is 1234
  const tabId = activeTab?.split(' ')[1]
  return (
    <Box className="flex-1 flex px-3 pt-4">
      <Tabs.Root
        defaultValue={RevenueCycleTab.Claim}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col flex-1"
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
          <ResponseHistoryTabView />
        </TabsContent>
        <TabsContent value={RevenueCycleTab.InsurancePayment}>
          <InsurancePaymentTabView />
        </TabsContent>
        <TabsContent value={RevenueCycleTab.PatientStatement}>
          <PatientStatementsTabView />
        </TabsContent>
        {claimTabsContent.map((tabid) => {
          return (
            <TabsContent value={`${tabid}`} key={tabid}>
              <ClaimDetailView />
            </TabsContent>
          )
        })}
        <TabsContent value={`${RevenueCycleTab.CheckDetails} ${tabId}`}>
          <InsurancePaymentDetailView />
        </TabsContent>
        <TabsContent value={`${RevenueCycleTab.ViewFile} ${tabId}`}>
          <FileView url={selectedPdfFileUrl} />
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
  const forceMount = viewedTabs.has(value) ? true : undefined
  return (
    <Tabs.Content
      forceMount={forceMount}
      value={value}
      className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { RevenueCycleTabs }

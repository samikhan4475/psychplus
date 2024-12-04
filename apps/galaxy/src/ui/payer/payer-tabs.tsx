'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { EdiTabView } from '../clearing-house/edi-tab'
import { PayerPlanTabView } from './payer-plan-tab'
import { EditPayerPlanDetail } from './payer-plan-tab/edit-payer-plan/edit-payer-plan-detail'
import { useStore } from './store'
import { PayerTabs } from './types'

const PayerTabView = () => {
  const {
    activeTab,
    setActiveTab,
    closeTab,
    closeableTabs,
    selectPayerPlanId,
  } = useStore((state) => ({
    closeableTabs: Array.from(state.closeableTabs),
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    closeTab: state.closeTab,
    selectPayerPlanId: state.selectPayerPlanId,
  }))
  const tabId = activeTab?.split('#')[1]
  return (
    <Box className="flex-1 px-1 pt-1">
      <Tabs.Root
        defaultValue={PayerTabs.Plan}
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex w-full flex-col"
      >
        <Flex className="z-50">
          <Tabs.List>
            <TabsTrigger value={PayerTabs.Group}>{PayerTabs.Group}</TabsTrigger>
            <TabsTrigger value={PayerTabs.Payer}>{PayerTabs.Payer}</TabsTrigger>
            <TabsTrigger value={PayerTabs.PayerType}>
              {PayerTabs.PayerType}
            </TabsTrigger>
            <TabsTrigger value={PayerTabs.Plan}>{PayerTabs.Plan}</TabsTrigger>
            <TabsTrigger value={PayerTabs.EDI}>{PayerTabs.EDI}</TabsTrigger>
            {closeableTabs.map((tab) => (
              <TabsTrigger onClose={() => closeTab(tab)} key={tab} value={tab}>
                {tab.replace('#', '')}
              </TabsTrigger>
            ))}
          </Tabs.List>
        </Flex>
        <TabsContent value={PayerTabs.Group}>Group</TabsContent>
        <TabsContent value={PayerTabs.Payer}>Payer</TabsContent>
        <TabsContent value={PayerTabs.PayerType}>PayerType</TabsContent>
        <TabsContent value={PayerTabs.Plan}>
          <PayerPlanTabView />
        </TabsContent>
        <TabsContent value={PayerTabs.EDI}>
          <EdiTabView />
        </TabsContent>
        <TabsContent value={`${PayerTabs.PlanDetails}${tabId}`}>
          <EditPayerPlanDetail selectPayerPlanId={selectPayerPlanId} />
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

export { PayerTabView }

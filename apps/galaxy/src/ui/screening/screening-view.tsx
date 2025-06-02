'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { ScreeningTabs } from './constants'
import { useStore } from './store'
import { UrineDrugScreenTab } from './urine-drug-screen-tab'

interface ScreeningViewProps {
  patientId: string
  urineDrugScreenData: QuickNoteSectionItem[]
}

const ScreeningView = ({
  patientId,
  urineDrugScreenData,
}: ScreeningViewProps) => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Tabs.Root
      className="flex w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={ScreeningTabs.UDS}>
            {ScreeningTabs.UDS}
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={ScreeningTabs.UDS}>
        <UrineDrugScreenTab
          patientId={patientId}
          urineDrugScreenData={urineDrugScreenData}
        />
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
  const viewedTabs = useStore((state) => state.viewedTabs)

  return (
    <Tabs.Content
      value={value}
      forceMount={viewedTabs.has(value) ? true : undefined}
      className="hidden flex-1 flex-col gap-2 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { ScreeningView }

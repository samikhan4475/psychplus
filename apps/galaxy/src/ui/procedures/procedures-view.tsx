'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { ProcedureTabs } from './constants'
import { EctWidget } from './ect-tab'
import { SpravatoTab } from './spravato-tab'
import { useStore } from './store'
import { TmsTab } from './tms-tab'

interface ProceduresViewProps {
  patientId: string
  procedureEctData: QuickNoteSectionItem[]
}

const ProceduresView = ({
  patientId,
  procedureEctData,
}: ProceduresViewProps) => {
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
          <TabsTrigger value={ProcedureTabs.ECT}>
            {ProcedureTabs.ECT}
          </TabsTrigger>
          <TabsTrigger value={ProcedureTabs.TMS}>
            {ProcedureTabs.TMS}
          </TabsTrigger>
          <TabsTrigger value={ProcedureTabs.SPRAVATO}>
            {ProcedureTabs.SPRAVATO}
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={ProcedureTabs.ECT}>
        <EctWidget patientId={patientId} procedureEctData={procedureEctData} />
      </TabsContent>
      <TabsContent value={ProcedureTabs.TMS}>
        <TmsTab patientId={patientId} />
      </TabsContent>
      <TabsContent value={ProcedureTabs.SPRAVATO}>
        <SpravatoTab patientId={patientId} />
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

export { ProceduresView }

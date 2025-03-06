'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { TabsValue } from './constants'
import { HospitalDischargeTab } from './hospital-discharge-widget/hospital-discharge-tab'
import { HospitalInitialTab } from './hospital-initial-widget/hospital-initial-tab'
import { useStore } from './store'

interface HospitalViewProps {
  patientId: string
  hospitalInitialData: QuickNoteSectionItem[]
  hospitalDischargeData: QuickNoteSectionItem[]
}

const HospitalView = ({
  patientId,
  hospitalInitialData,
  hospitalDischargeData,
}: HospitalViewProps) => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-col"
    >
      <Flex>
        <Tabs.List>
          <TabsTrigger value={TabsValue.Initial}>
            {TabsValue.Initial}
          </TabsTrigger>
        </Tabs.List>
        <Tabs.List>
          <TabsTrigger value={TabsValue.Discharge}>
            {TabsValue.Discharge}
          </TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={TabsValue.Initial}>
        <HospitalInitialTab
          patientId={patientId}
          isHospitalInitialTab={true}
          hospitalInitialData={hospitalInitialData}
        />
      </TabsContent>
      <TabsContent value={TabsValue.Discharge}>
        <HospitalDischargeTab
          patientId={patientId}
          isHospitalDischargeTab={true}
          hospitalDischargeData={hospitalDischargeData}
          hospitalInitialData={hospitalInitialData}
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

export { HospitalView, TabsValue }

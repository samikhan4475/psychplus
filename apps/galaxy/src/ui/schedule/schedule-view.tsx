'use client'

import { PropsWithChildren, useEffect } from 'react'
import { Flex, Heading, Tabs } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { CalendarView } from './calendar-view'
import { SchedulerActionButtonGroup } from './components/header'
import { ListView } from './list-view'
import { ProviderCoding } from './provider-coding'
import { RoundingView } from './rounding-view'
import { ViewHeader } from './schedule-view-header'
import { TabsList } from './schedule-view-tabs-list'
import { SchedulerView } from './scheduler-view'
import { useEncounterTypeStore, useStore } from './store'
import { TabValue } from './types'

const ScheduleView = () => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))
  const { fetchVisitEncounterTypes } = useEncounterTypeStore()

  useEffect(() => {
    fetchVisitEncounterTypes()
  }, [])

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-1 flex-col overflow-y-auto"
    >
      <Flex align="center" className="px-2.5 py-0.5 shadow-1" justify="between">
        <Flex>
          <Heading className="text-xl font-semibold">Schedule</Heading>
          <TabsList isFeatureFlagEnabled={isFeatureFlagEnabled} />
        </Flex>
        <ViewHeader selectedTab={activeTab} />
        <SchedulerActionButtonGroup />
      </Flex>
      <TabsContent value={TabValue.List}>
        <ListView />
      </TabsContent>
      <TabsContent value={TabValue.Calendar}>
        <CalendarView />
      </TabsContent>
      <TabsContent value={TabValue.Scheduler}>
        <SchedulerView />
      </TabsContent>
      <TabsContent value={TabValue.ProviderCoding}>
        <ProviderCoding />
      </TabsContent>
      <TabsContent value={TabValue.Rounding}>
        <RoundingView />
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: PropsWithChildren<{ value: string }>) => {
  const visitedTabs = useStore((state) => state.visitedTabs)
  return (
    <Tabs.Content
      value={value}
      className="hidden flex-1 flex-col overflow-y-auto data-[state=active]:flex"
      forceMount={visitedTabs.has(value) ? true : undefined}
    >
      {children}
    </Tabs.Content>
  )
}

export { ScheduleView }

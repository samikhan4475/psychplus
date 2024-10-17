'use client'

import { PropsWithChildren, useEffect } from 'react'
import { Flex, Heading, Tabs } from '@radix-ui/themes'
import { CalendarView } from './calendar-view'
import { SchedulerActionButtonGroup } from './components/header'
import { ListView } from './list-view'
import { ProviderCoding } from './provider-coding'
import { RoundingView } from './rounding-view'
import { ViewHeader } from './schedule-view-header'
import { TabsList } from './schedule-view-tabs-list'
import { SchedulerView } from './scheduler-view'
import { useBookedAppointmentsStore, useStore } from './store'
import { TabValue } from './types'

const ScheduleView = () => {
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))
  const fetchBookedAppointments = useBookedAppointmentsStore(
    (state) => state.fetchData,
  )

  useEffect(() => {
    fetchBookedAppointments()
  }, [])

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex w-full flex-1 flex-col overflow-y-auto"
    >
      <Flex
        align="center"
        className="py-0.5 pl-[22px] pr-5 shadow-1"
        justify="between"
      >
        <Flex>
          <Heading className="text-xl font-semibold">Schedule</Heading>
          <TabsList />
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

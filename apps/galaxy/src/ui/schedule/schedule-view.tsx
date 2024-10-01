'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Flex, Heading, Tabs } from '@radix-ui/themes'
import { EditVisit } from '../visit/edit-visit'
import { getClinicsOptionsAction, getProvidersOptionsAction } from './actions'
import { CalendarView } from './calendar-view'
import { SchedulerActionButtonGroup } from './components/header'
import { DropdownContext } from './context'
import { ListView } from './list-view'
import { RoundingView } from './rounding-view'
import { ViewHeader } from './schedule-view-header'
import { TabsList } from './schedule-view-tabs-list'
import { SchedulerView } from './scheduler-view'
import { useStore } from './store'
import { Option, TabValue } from './types'
import { State } from '@/types'

interface ScheduleViewProps {
  insurancePlans: Option[]
  usStates: State[]
}

const tabContentClass = (tab: string, currentSelection: string) => {
  if (tab !== currentSelection) return
  return 'flex flex-1 flex-col overflow-y-auto'
}

const ScheduleView = ({ insurancePlans, usStates }: ScheduleViewProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(TabValue.List)
  const { setProvidersOptions, setClinicsOptions } = useStore((state) => ({
    setProvidersOptions: state.setProvidersOptions,
    setClinicsOptions: state.setClinicsOptions,
  }))

  const ctxValue = useMemo(
    () => ({ insurancePlans, usStates }),
    [insurancePlans, usStates],
  )

  useEffect(() => {
    getProvidersOptionsAction().then((response) => {
      if (response.state === 'error') {
        throw new Error(response.error)
      }
      setProvidersOptions(response.data)
    })
    getClinicsOptionsAction().then((response) => {
      if (response.state === 'error') {
        throw new Error(response.error)
      }
      setClinicsOptions(response.data)
    })
  }, [])

  return (
    <DropdownContext.Provider value={ctxValue}>
      <Tabs.Root
        defaultValue={TabValue.List}
        onValueChange={setSelectedTab}
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
          <ViewHeader selectedTab={selectedTab} />
          <SchedulerActionButtonGroup />
        </Flex>
        <Tabs.Content
          value={TabValue.List}
          className={tabContentClass(TabValue.List, selectedTab)}
        >
          <ListView />
        </Tabs.Content>
        <Tabs.Content
          value={TabValue.Calendar}
          className={tabContentClass(TabValue.Calendar, selectedTab)}
        >
          <CalendarView states={usStates} />
        </Tabs.Content>
        <Tabs.Content
          value={TabValue.Scheduler}
          className={tabContentClass(TabValue.Scheduler, selectedTab)}
        >
          <SchedulerView />
        </Tabs.Content>
        <Tabs.Content value={TabValue.ProviderCoding}>
          <EditVisit states={usStates}>
            <Button variant="ghost">Provider Coding View</Button>
          </EditVisit>
        </Tabs.Content>
        <Tabs.Content
          className={tabContentClass(TabValue.Rounding, selectedTab)}
          value={TabValue.Rounding}
        >
          <RoundingView />
        </Tabs.Content>
      </Tabs.Root>
    </DropdownContext.Provider>
  )
}

export { ScheduleView }
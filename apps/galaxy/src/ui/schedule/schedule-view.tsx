'use client'

import { useEffect, useState } from 'react'
import { Flex, Heading, Tabs } from '@radix-ui/themes'
import { cn } from '@/utils'
import { StateCodeSet } from '../visit/add-visit/types'
import { getClinicsOptionsAction, getProvidersOptionsAction } from './actions'
import { CalendarView } from './calendar-view'
import { DateStepper } from './calendar-view/date-stepper'
import {
  ColumnFilterGroup,
  SchedulerActionButtonGroup,
} from './components/header'
import { SchedulerFilterGroup } from './components/header/scheduler-filter-group'
import { RoundingView, RoundingViewFilterGroup } from './rounding-view'
import { TabsList } from './schedule-view-tabs-list'
import { useStore } from './store'
import { TabValue } from './types'

const ScheduleView = ({ states }: { states: StateCodeSet[] }) => {
  const [selectedTab, setSelectedTab] = useState<string>(TabValue.Calendar)
  const { setProvidersOptions, setClinicsOptions } = useStore((state) => ({
    setProvidersOptions: state.setProvidersOptions,
    setClinicsOptions: state.setClinicsOptions,
  }))

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
    <Tabs.Root
      defaultValue={TabValue.Calendar}
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
        {selectedTab === TabValue.Calendar && <DateStepper />}
        {selectedTab === TabValue.List && <ColumnFilterGroup />}
        {selectedTab === TabValue.Scheduler && <SchedulerFilterGroup />}
        {selectedTab === TabValue.Rounding && <RoundingViewFilterGroup />}
        <SchedulerActionButtonGroup states={states} />
      </Flex>
      <Tabs.Content value={TabValue.List}>List View</Tabs.Content>
      <Tabs.Content
        value={TabValue.Calendar}
        className={cn({
          'flex flex-1 flex-col overflow-y-auto':
            selectedTab === TabValue.Calendar,
        })}
      >
        <CalendarView />
      </Tabs.Content>
      <Tabs.Content value={TabValue.Scheduler}>Scheduler View</Tabs.Content>
      <Tabs.Content value={TabValue.ProviderCoding}>
        Provider Coding View
      </Tabs.Content>
      <Tabs.Content
        className={cn({
          'flex flex-1 flex-col overflow-y-auto':
            selectedTab === TabValue.Rounding,
        })}
        value={TabValue.Rounding}
      >
        <RoundingView />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export { ScheduleView }

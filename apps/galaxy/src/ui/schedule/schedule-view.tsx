'use client'

import { useState } from 'react'
import { Box, Flex, Heading, Tabs } from '@radix-ui/themes'
import { SchedulerActionButtonGroup, ColumnFilterGroup } from './components/header'
import { SchedulerFilterGroup } from './components/header/schedular-filter-group'
import { FilterVisibilityContext } from './context'
import { TabsList } from './schedule-view-tabs-list'
import { TabValue } from './types'

const ScheduleView = () => {
  const [selectedTab, setSelectedTab] = useState<string>(TabValue.Scheduler)
  const [areFiltersHidden, setAreFiltersHidden] = useState<boolean>(false)

  return (
    <Box className="min-h-[650px]">
      <FilterVisibilityContext.Provider value={setAreFiltersHidden}>
        <Tabs.Root defaultValue="scheduler" onValueChange={setSelectedTab}>
          <Flex
            align="center"
            className="py-0.5 pl-[22px] pr-5 shadow-1"
            justify="center"
          >
            <Heading className="text-xl font-semibold">Clinic</Heading>

            <TabsList
              areFiltersHidden={areFiltersHidden}
              setAreFiltersHidden={setAreFiltersHidden}
            />

            {selectedTab === TabValue.List && <ColumnFilterGroup />}
            {selectedTab === TabValue.Scheduler && <SchedulerFilterGroup />}
            <SchedulerActionButtonGroup />
          </Flex>
          <Tabs.Content value={TabValue.List}>List View</Tabs.Content>
          <Tabs.Content value={TabValue.Calender}>Calendar View</Tabs.Content>
          <Tabs.Content value={TabValue.Scheduler}>Scheduler View</Tabs.Content>
        </Tabs.Root>
      </FilterVisibilityContext.Provider>
    </Box>
  )
}

export { ScheduleView }

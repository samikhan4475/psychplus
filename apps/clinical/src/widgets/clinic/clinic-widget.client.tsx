'use client'

import { useRef, useState } from 'react'
import { Box, Button, Flex, Heading, Tabs } from '@radix-ui/themes'
import { ListFilterIcon } from 'lucide-react'
import { cn } from '@psychplus/ui/cn'
import { CLINIC_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { ActionButtonGroup, ColumnFilterGroup } from './components/header'
import { SchedulerFilterGroup } from './components/header/schedular-filter-group'
import { DateStepper } from './components/scheduler-view'
import { SchedulerFilters } from './components/scheduler-view/schedular-filters'
import { SchedulerViewContent } from './components/scheduler-view/scheduler-view-content'
import { FilterVisibilityContext } from './context'

const tabButtonClasses =
  'text-[12px] data-[state=active]:font-[510] data-[state=active]:before:bg-transparent data-[state=active]:bg-[#D9E2FC] data-[state=active]:text-[#194595] text-[#000000] h-6 rounded-[2px] data-[state=active]:rounded-[2px] data-[state=active]:text-[12px] px-[0.4px] box-border [box-shadow:inset_0_0_0_0.4px_#B9BBC6]'

enum TabValue {
  Scheduler = 'scheduler',
  List = 'list',
  Calender = 'calendar',
}

const ClinicWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [selectedTab, setSelectedTab] = useState<string>(TabValue.Scheduler)
  const [areFiltersHidden, setAreFiltersHidden] = useState<boolean>(false)
  usePublishLoaded(CLINIC_WIDGET)
  usePublishSize(CLINIC_WIDGET, ref)

  return (
    <Box className="h-screen min-h-[650px]" ref={ref}>
      <FilterVisibilityContext.Provider value={setAreFiltersHidden}>
        <Tabs.Root defaultValue="scheduler" onValueChange={setSelectedTab} className='relative z-0'>
          <Flex
            align="center"
            className="sticky top-0 bg-[#FFF] z-20 py-0.5 pl-[22px] pr-5 [box-shadow:0_4px_4px_0_#00000014]"
            justify="center"
          >
            <Heading className="text-xl font-semibold">Clinic</Heading>
            <Tabs.List
              className={cn(
                'items-center gap-x-2 pl-[17px] [box-shadow:none] lg:flex-1',
              )}
            >
              <Tabs.Trigger className={tabButtonClasses} value={TabValue.List}>
                List View
              </Tabs.Trigger>
              <Tabs.Trigger
                className={tabButtonClasses}
                value={TabValue.Calender}
              >
                Calendar View
              </Tabs.Trigger>
              <Tabs.Trigger
                className={tabButtonClasses}
                value={TabValue.Scheduler}
              >
                Scheduler View
              </Tabs.Trigger>
              <Button
                className={cn(
                  'h-6 cursor-pointer text-[#000000] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]',
                  {
                    'bg-[#D9E2FC]': !areFiltersHidden,
                    'text-[#194595]': !areFiltersHidden,
                  },
                )}
                variant="outline"
                type="button"
                onClick={() => setAreFiltersHidden(!areFiltersHidden)}
              >
                <ListFilterIcon width={12} height={12} />
                {areFiltersHidden ? 'More Filters' : 'Hide Filters'}
              </Button>
            </Tabs.List>
            {selectedTab === TabValue.Scheduler && <DateStepper />}
            {selectedTab === TabValue.List && <ColumnFilterGroup />}
            {selectedTab === TabValue.Scheduler && <SchedulerFilterGroup />}
            <ActionButtonGroup />
          </Flex>
          <Tabs.Content value={TabValue.List}>List View</Tabs.Content>
          <Tabs.Content value={TabValue.Calender}>Calendar</Tabs.Content>
          <Tabs.Content value={TabValue.Scheduler}>
            {areFiltersHidden ? null : <SchedulerFilters />}
            <SchedulerViewContent />
          </Tabs.Content>
        </Tabs.Root>
      </FilterVisibilityContext.Provider>
    </Box>
  )
}

export { ClinicWidgetClient }

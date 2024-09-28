'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Flex, Heading, Tabs } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { State } from '@/types'
import { cn } from '@/utils'
import { EditVisit } from '../visit/edit-visit'
import { getClinicsOptionsAction, getProvidersOptionsAction } from './actions'
import { CalendarView } from './calendar-view'
import { SchedulerActionButtonGroup } from './components/header'
import { DropdownContext } from './context'
import { ListView } from './list-view'
import { RoundingView } from './rounding-view'
import { ViewHeader } from './schedule-view-header'
import { TabsList } from './schedule-view-tabs-list'
import { useStore } from './store'
import { Option, TabValue } from './types'

interface ScheduleViewProps {
  insurancePlans: Option[]
  usStates: State[]
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
  const getProvidersAndClinicsOptions = async () => {
    const [providersResponse, clinicsResponse] = await Promise.all([
      getProvidersOptionsAction(),
      getClinicsOptionsAction(),
    ])

    if (providersResponse.state === 'error') {
      toast.error(providersResponse.error)
    }

    if (clinicsResponse.state === 'error') {
      toast.error(clinicsResponse.error)
    }

    setProvidersOptions(
      providersResponse.state === 'error' ? [] : providersResponse.data,
    )
    setClinicsOptions(
      clinicsResponse.state === 'error' ? [] : clinicsResponse.data,
    )
  }

  useEffect(() => {
    getProvidersAndClinicsOptions()
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
          className={cn({
            'flex flex-1 flex-col overflow-y-auto':
              selectedTab === TabValue.List,
          })}
        >
          <ListView />
        </Tabs.Content>
        <Tabs.Content
          value={TabValue.Calendar}
          className={cn({
            'flex flex-1 flex-col overflow-y-auto':
              selectedTab === TabValue.Calendar,
          })}
        >
          <CalendarView states={usStates} />
        </Tabs.Content>
        <Tabs.Content value={TabValue.Scheduler}>Scheduler View</Tabs.Content>
        <Tabs.Content value={TabValue.ProviderCoding}>
          <EditVisit states={usStates}>
            <Button variant="ghost">Provider Coding View</Button>
          </EditVisit>
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
    </DropdownContext.Provider>
  )
}

export { ScheduleView }

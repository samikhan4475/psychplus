'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { DayHeader } from './day-header'
import { SchedulerFilterGroup } from './filter-actions-group'
import { ProvidersAccordionMenu } from './providers-accordion-menu'
import { useStore } from './store'

const SchedulerView = ({
  showFollowUpFilter = false,
  noOfDays = 13,
}: {
  showFollowUpFilter?: boolean
  noOfDays?: number
}) => {
  const { fetchAvailableSlots, loading } = useStore((state) => ({
    fetchAvailableSlots: state.fetchAppointments,
    loading: state.loading,
  }))

  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  return (
    <Flex direction="column" className="overfow-auto h-full">
      <ScrollArea className="flex-1">
        <Flex
          direction="column"
          position="sticky"
          top="0"
          className="bg-white z-10"
        >
          <SchedulerFilterGroup showFollowUpFilter={showFollowUpFilter} />

          <DayHeader noOfDays={noOfDays} />
        </Flex>
        {loading ? (
          <Flex height="100%" align="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <ProvidersAccordionMenu />
        )}
      </ScrollArea>
    </Flex>
  )
}

export { SchedulerView }

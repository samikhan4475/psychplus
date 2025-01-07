'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { NewPatient } from '@/types'
import { useProviderId } from '../hooks'
import { DayHeader } from './day-header'
import { SchedulerFilterGroup } from './filter-actions-group'
import { ProvidersAccordionMenu } from './providers-accordion-menu'
import { useStore } from './store'

const SchedulerView = ({
  showFollowUpFilter = false,
  noOfDays = 13,
  patient,
}: {
  showFollowUpFilter?: boolean
  noOfDays?: number
  patient?: NewPatient
}) => {
  const { fetchAvailableSlots, loading } = useStore((state) => ({
    fetchAvailableSlots: state.fetchAppointments,
    loading: state.loading,
  }))
  const providerId = useProviderId()

  useEffect(() => {
    if (!providerId) return
    fetchAvailableSlots({ staffIds: [Number(providerId)] })
  }, [])

  return (
    <Flex direction="column" className="h-full">
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
          <ProvidersAccordionMenu patient={patient} />
        )}
      </ScrollArea>
    </Flex>
  )
}

export { SchedulerView }

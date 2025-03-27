'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { NewPatient } from '@/types'
import { DayHeader } from './day-header'
import { SchedulerFilterGroup } from './filter-actions-group'
import { ProvidersAccordionMenu } from './providers-accordion-menu'
import { useStore } from './store'

const SchedulerView = ({
  isFollowup = false,
  consultationDate,
  noOfDays = 13,
  patient,
  onVisitAdd,
  offsetStartDate,
}: {
  isFollowup?: boolean
  noOfDays?: number
  patient?: NewPatient
  onVisitAdd?: () => void
  offsetStartDate?: string
  consultationDate?: string
}) => {
  const { loading } = useStore((state) => ({
    loading: state.loading,
  }))

  return (
    <Flex direction="column" className="h-full">
      <ScrollArea className="flex-1">
        <Flex
          direction="column"
          position="sticky"
          top="0"
          className="bg-white z-10"
        >
          <SchedulerFilterGroup isFollowup={isFollowup} />

          <DayHeader noOfDays={noOfDays} offsetStartDate={offsetStartDate} />
        </Flex>
        {loading ? (
          <Flex height="100%" align="center">
            <LoadingPlaceholder />
          </Flex>
        ) : (
          <ProvidersAccordionMenu
            consultationDate={consultationDate}
            isFollowup={isFollowup}
            patient={patient}
            onVisitAdd={onVisitAdd}
          />
        )}
      </ScrollArea>
    </Flex>
  )
}

export { SchedulerView }

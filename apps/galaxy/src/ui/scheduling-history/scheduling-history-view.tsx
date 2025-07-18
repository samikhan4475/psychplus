'use client'

import { useState } from 'react'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { TreatmentBillingAlert } from '@/components'
import { StaffComment } from '@/types'
import { AutomaticBookingToggle } from './automatic-booking-toggle'
import { SchedulingHistoryTable } from './scheduling-history-table'
import { SchedulingHistoryTablePagination } from './scheduling-history-table-pagination'

interface SchedulingHistoryViewProps {
  patientId: string
}

const SchedulingHistoryView = ({ patientId }: SchedulingHistoryViewProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeDialog = () => {
    setIsOpen(false)
  }

  return (
    <Flex className="w-full p-[1px]" direction="column" gap="1">
      <Flex
        className="bg-white z-[1] rounded-1 shadow-2"
        py="1"
        px="2"
        position="sticky"
        top="0"
        justify="between"
      >
        <Heading size="4">Scheduling History</Heading>
        <AutomaticBookingToggle patientId={patientId} />
      </Flex>
      <Flex direction="column" className="bg-white w-full">
        <SchedulingHistoryTable />
        <SchedulingHistoryTablePagination />
      </Flex>
      <TreatmentBillingAlert
        title="Billing"
        isOpen={isOpen}
        closeDialog={closeDialog}
        billingComments={comment ?? []}
      />
    </Flex>
  )
}

const comment: StaffComment[] = [...Array(1)].map((i) => ({
  id: Number(i),
  date_time: '03/12/24',
  staff: 'John Smith, MD',
  comment:
    "The EHR's scheduling module has made appointment management much easier and more organized. It’s great to have automated reminders for both patients and staff",
}))

export { SchedulingHistoryView }

'use client'

import { Box, Flex, Heading } from '@radix-ui/themes'
import { SchedulingHistoryTable } from './scheduling-history-table'

interface SchedulingHistoryViewProps {
  patientId: string
}

const SchedulingHistoryView = ({ patientId }: SchedulingHistoryViewProps) => {
  return (
    <Flex className="w-full p-[1px]" direction="column" gap="1">
      <Box
        className="bg-white z-[1] rounded-1 shadow-2"
        py="1"
        px="2"
        position="sticky"
        top="0"
      >
        <Heading size="4">Scheduling History</Heading>
      </Box>
      <SchedulingHistoryTable />
    </Flex>
  )
}

export { SchedulingHistoryView }

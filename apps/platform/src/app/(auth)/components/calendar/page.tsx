'use client'

import * as React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { Calendar } from '@psychplus/ui/calendar'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Calendar'
const DESCRIPTION =
  'A date field component that allows users to enter and edit dates.'

const CalendarComponentPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />

      <Box mb="7">
        <Flex align="center" justify="center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-3 border border-gray-1 shadow-3"
          />
        </Flex>
      </Box>
    </>
  )
}

export default CalendarComponentPage

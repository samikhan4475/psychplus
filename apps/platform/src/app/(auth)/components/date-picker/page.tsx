'use client'

import * as React from 'react'
import { Box, Heading } from '@radix-ui/themes'
import { addDays } from 'date-fns'
import { DatePicker } from '@psychplus/ui/date-picker'
import { DatePickerWithPresets } from '@psychplus/ui/date-picker-with-presets'
import { DateRangePicker } from '@psychplus/ui/date-range-picker'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Date Picker'
const DESCRIPTION = 'A date picker component with range and presets.'

const today = new Date()

const DatePickerComponentPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [date2, setDate2] = React.useState<Date | undefined>(undefined)
  const [date3, setDate3] = React.useState<Date | undefined>(undefined)
  const [date4, setDate4] = React.useState<any>({
    from: today,
    to: addDays(today, 10),
  })

  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />

      <Box mb="7">
        <DatePicker date={date} onSelect={setDate} />
      </Box>

      <Box mb="7">
        <Box mb="3">
          <Heading size="5">Without a value</Heading>
        </Box>
        <DatePicker date={date2} onSelect={setDate2} />
      </Box>

      <Box mb="7">
        <Box mb="3">
          <Heading size="5">With presets</Heading>
        </Box>
        <DatePickerWithPresets date={date3} onSelect={setDate3} />
      </Box>

      <Box mb="7">
        <Box mb="3">
          <Heading size="5">Range</Heading>
        </Box>
        <DateRangePicker date={date4} onSelect={setDate4} />
      </Box>
    </>
  )
}

export default DatePickerComponentPage

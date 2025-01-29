'use client'

import { Flex } from '@radix-ui/themes'
import { DateField, DateInput, DateSegment } from 'react-aria-components'
import { BlockLabel } from '@/components'
import { Appointment } from '@/types'
import { convertToTimezone } from '../visit/utils'

interface QuickNotesDateInputProps {
  appointment: Appointment
}

const QuickNotesDateInput = ({ appointment }: QuickNotesDateInputProps) => {
  const { date } = convertToTimezone(
    appointment.startDate,
    appointment.locationTimezoneId,
  )

  return (
    <Flex direction="column" gap="1">
      <BlockLabel name="quicknotes-date" orientation="vertical">
        Date
      </BlockLabel>
      <DateField
        name="quicknotes-date"
        value={date}
        onChange={undefined}
        onBlur={undefined}
        isRequired
        // Let React Hook Form handle validation instead of the browser.
        validationBehavior="aria"
        aria-label="QuickNotes date input"
        isDisabled
      >
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
      </DateField>
    </Flex>
  )
}

export { QuickNotesDateInput }

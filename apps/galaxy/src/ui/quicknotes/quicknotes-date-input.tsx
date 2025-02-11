'use client'

import { Flex } from '@radix-ui/themes'
import {
  DateField,
  DateInput,
  DateSegment,
  I18nProvider,
} from 'react-aria-components'
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
    <I18nProvider locale="en-US">
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
          <DateInput>
            {(segment) => {
              let formattedText = segment.text

              if (segment.type === 'year') {
                formattedText = segment.text.slice(-2)
              } else if (segment.type === 'month' || segment.type === 'day') {
                formattedText = segment.text.padStart(2, '0')
              }

              return (
                <DateSegment
                  segment={{
                    ...segment,
                    text: formattedText,
                  }}
                />
              )
            }}
          </DateInput>
        </DateField>
      </Flex>
    </I18nProvider>
  )
}

export { QuickNotesDateInput }

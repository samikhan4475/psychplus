'use client'

import { getLocalTimeZone, today } from '@internationalized/date'
import { Flex, Text } from '@radix-ui/themes'
import { DateField, DateInput, DateSegment } from 'react-aria-components'
import { BlockLabel } from '@/components'

const QuickNotesDateInput = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel name="quicknotes-date" orientation="vertical">
        Date
      </BlockLabel>
      <DateField
        name="quicknotes-date"
        value={today(getLocalTimeZone())}
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

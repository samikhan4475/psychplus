'use client'

import { Flex } from '@radix-ui/themes'
import {
  DateRangeEnd,
  DateRangeError,
  DateRangeStart,
  FieldLabel,
  FormFieldContainer,
} from '../../shared'

const LastCoverageDateRange = () => {
  return (
    <Flex direction="column" gap="1">
      <FormFieldContainer>
        <FieldLabel>LCD</FieldLabel>
        <DateRangeStart
          dateField="lastCoverageDateStart"
          referenceDateField="lastCoverageDateEnd"
        />
        <DateRangeEnd
          dateField="lastCoverageDateEnd"
          referenceDateField="lastCoverageDateStart"
        />
      </FormFieldContainer>
      <DateRangeError
        startDateName="lastCoverageDateStart"
        endDateName="lastCoverageDateEnd"
      />
    </Flex>
  )
}

export { LastCoverageDateRange }

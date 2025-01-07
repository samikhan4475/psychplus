'use client'

import { Flex } from '@radix-ui/themes'
import { useFiltersContext } from '../context'
import {
  DateRangeEnd,
  DateRangeError,
  DateRangeStart,
  FieldLabel,
  FormFieldContainer,
} from '../shared'
import { SchedulerFilters } from '../types'

const LastCoverageDateRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.LCD)) return null

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

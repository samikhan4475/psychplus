'use client'

import { Flex } from '@radix-ui/themes'
import { useFiltersContext } from '../../context'
import {
  DateRangeEnd,
  DateRangeError,
  DateRangeStart,
  FieldLabel,
  FormFieldContainer,
} from '../../shared'
import { SchedulerFilters } from '../../types'

const DateOfAdmissionRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.DOA)) return null

  return (
    <Flex direction="column" gap="1">
      <FormFieldContainer>
        <FieldLabel>DOA</FieldLabel>
        <DateRangeStart
          dateField="dateOfAdmissionStart"
          referenceDateField="dateOfAdmissionEnd"
        />
        <DateRangeEnd
          dateField="dateOfAdmissionEnd"
          referenceDateField="dateOfAdmissionStart"
        />
      </FormFieldContainer>
      <DateRangeError
        startDateName="dateOfAdmissionStart"
        endDateName="dateOfAdmissionEnd"
      />
    </Flex>
  )
}

export { DateOfAdmissionRange }

'use client'

import { CalendarDate } from '@internationalized/date'
import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const LastCoverageDateRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.LCD)) return null

  return (
    <Flex direction="column" gap="1">
      <FormFieldContainer>
        <FieldLabel>LCD</FieldLabel>
        <DatePickerInput
          field="lastCoverageDateStart"
          showError={false}
          minValue={new CalendarDate(2000, 1, 1)}
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { LastCoverageDateRange }

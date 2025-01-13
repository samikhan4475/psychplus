'use client'

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
        <DatePickerInput field="lastCoverageDateStart" showError={false} />
      </FormFieldContainer>
    </Flex>
  )
}

export { LastCoverageDateRange }

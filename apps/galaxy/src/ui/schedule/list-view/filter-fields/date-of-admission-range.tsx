'use client'

import { Flex } from '@radix-ui/themes'
import { DatePickerInput } from '@/components'
import { useFiltersContext } from '../../context'
import { DateRangeError, FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const DateOfAdmissionRange = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.DOA)) return null

  return (
    <Flex direction="column" gap="1">
      <FormFieldContainer>
        <FieldLabel>DOA</FieldLabel>
        <DatePickerInput field="dateOfAdmissionStart" showError={false} />
      </FormFieldContainer>
    </Flex>
  )
}

export { DateOfAdmissionRange }

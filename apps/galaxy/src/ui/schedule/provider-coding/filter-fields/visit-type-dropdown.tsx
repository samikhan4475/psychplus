'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitTypeDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitType)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Visit Type</FieldLabel>
      <Flex className="flex-1">
        <CodesetSelect
          name="visitType"
          codeset={CODESETS.VisitType}
          size="1"
          className="min-w-full max-w-[10px] truncate"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { VisitTypeDropdown }

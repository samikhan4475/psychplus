'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitTypeSelect = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.VisitType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Type</FieldLabel>
      <Flex className="flex-1" align="center">
        <CodesetSelect
          name="visitType"
          className="min-w-full max-w-[10px] truncate"
          codeset={CODESETS.VisitType}
          size="1"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { VisitTypeSelect }

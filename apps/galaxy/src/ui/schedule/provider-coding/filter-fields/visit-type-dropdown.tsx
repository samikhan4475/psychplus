'use client'

import { Flex } from '@radix-ui/themes'
import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const VisitTypeDropdown = () => {
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.VisitType)
  if (!filters.includes(SchedulerFilters.VisitType)) return null

  return (
    <FormFieldContainer className="flex-1">
      <FieldLabel>Visit Type</FieldLabel>
      <Flex className="flex-1">
        <DropdownSelect
          field="visitTypes"
          options={options}
          shouldDirty
          buttonClassName="min-w-full max-w-[10px] truncate"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { VisitTypeDropdown }

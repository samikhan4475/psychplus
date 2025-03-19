'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelect, DropdownSelect } from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderDropdown = () => {
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(CODESETS.ProviderType, undefined, [
    CODE_NOT_SET,
  ])
  if (!filters.includes(SchedulerFilters.ProviderType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <Flex className="flex-1">
        <DropdownSelect
          field="providerTypes"
          options={options}
          shouldDirty
          buttonClassName="min-w-full max-w-[10px] truncate"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { ProviderDropdown }

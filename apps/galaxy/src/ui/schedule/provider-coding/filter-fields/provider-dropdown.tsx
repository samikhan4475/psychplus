'use client'

import { Flex } from '@radix-ui/themes'
import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { EXCLUDED_PROVIDER_TYPES } from '../../constants'
import { useFiltersContext } from '../../context'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { SchedulerFilters } from '../../types'

const ProviderDropdown = () => {
  const { filters } = useFiltersContext()
  const options = useCodesetOptions(
    CODESETS.ProviderType,
    undefined,
    EXCLUDED_PROVIDER_TYPES,
  )
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

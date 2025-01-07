'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useFiltersContext } from '../context'
import { FieldLabel, FormFieldContainer } from '../shared'
import { SchedulerFilters } from '../types'

const ProviderTypeDropdown = () => {
  const { filters } = useFiltersContext()
  if (!filters.includes(SchedulerFilters.ProviderType)) return null

  return (
    <FormFieldContainer>
      <FieldLabel>Provider Type</FieldLabel>
      <Flex className="flex-1">
        <CodesetSelect
          codeset={CODESETS.ProviderType}
          size="1"
          name="providerType"
          className="min-w-full max-w-[10px] truncate"
        />
      </Flex>
    </FormFieldContainer>
  )
}

export { ProviderTypeDropdown }

import React from 'react'
import { getProvidersOptionsAction } from '@/actions'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { AsyncRowSelect } from '@/components/async-row-select'
import { SelectOptionType } from '@/types'

const SearchAddMemberSelect = () => {
  const onOptionClick = async (option: SelectOptionType) => {}
  return (
    <FormFieldContainer className="flex-row">
      <FormFieldLabel>Search & Add Member</FormFieldLabel>
      <AsyncRowSelect
        size="1"
        className="w-[280px]"
        allowMultiple
        label="Select Staff member"
        onRowClick={onOptionClick}
        fetchOptions={getProvidersOptionsAction}
      />
    </FormFieldContainer>
  )
}

export { SearchAddMemberSelect }

'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const DefProviderField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="pb-[3px]">Def. Provider</FormFieldLabel>
      <AsyncSelect
        field="defaultProviderStaffId"
        placeholder="Select"
        fetchOptions={getProvidersOptionsAction}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
      <FormFieldError name="defaultProviderStaffId" />
    </FormFieldContainer>
  )
}

export { DefProviderField }

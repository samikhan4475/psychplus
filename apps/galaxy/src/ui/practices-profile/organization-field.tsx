'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput
} from '@/components'

const OrganizationField = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <SelectInput
        options={[]}
        field='organization'
        disabled
        buttonClassName='w-full'
      />
      <FormFieldError name="organization" />
    </FormFieldContainer>
  )
}

export { OrganizationField }

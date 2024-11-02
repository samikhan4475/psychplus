'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { CODE_NOT_SET, CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'

const ServiceSelect = () => {
  const options = useCodesetOptions(CODESETS.ServicesOffered, '', [
    CODE_NOT_SET,
  ])
  return (
    <FormFieldContainer>
      <FormFieldLabel className="!text-1">Service</FormFieldLabel>
      <SelectInput
        field="service"
        size="1"
        options={options}
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
      />
      <FormFieldError name="service" />
    </FormFieldContainer>
  )
}

export { ServiceSelect }

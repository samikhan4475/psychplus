'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'

const ProviderDropdown = () => {
  return (
    <Flex direction="column" gap="1" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Visit Title
      </FormFieldLabel>
      <SelectInput
        field="provider"
        placeholder="Select Provider"
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="provider" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { ProviderDropdown }

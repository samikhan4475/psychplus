'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'

const CosignerDropdown = () => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Cosigner
      </FormFieldLabel>
      <SelectInput
        field="cosigner"
        placeholder="Select Cosigner"
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="cosigner" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { CosignerDropdown }

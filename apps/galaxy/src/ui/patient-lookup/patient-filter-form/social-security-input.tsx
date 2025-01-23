'use client'

import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

const SocialSecurityInput = () => {
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">Social Security</FormFieldLabel>
        <NumericInput
          field="ssn"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          placeholder="Social security"
          prefix="***-**-"
          allowNegative={false}
          decimalScale={0}
          maxLimit={10000}
        />
      </Flex>
      <FormFieldError name="ssn" />
    </FormFieldContainer>
  )
}

export { SocialSecurityInput }

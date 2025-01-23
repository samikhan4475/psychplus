'use client'

import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

const AgeInput = () => {
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">Age</FormFieldLabel>
        <NumericInput
          field="age"
          allowNegative={false}
          prefix=""
          placeholder="Age"
          maxLimit={1000}
          decimalScale={0}
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        />
      </Flex>
      <FormFieldError name="age" />
    </FormFieldContainer>
  )
}

export { AgeInput }

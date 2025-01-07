'use client'

import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

const MRNInput = () => {
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
        <NumericInput
          field="mrn"
          allowNegative={false}
          prefix=""
          placeholder="MRN"
          decimalScale={0}
          maxLimit={Number('9'.repeat(8))}
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
        />
      </Flex>
      <FormFieldError name="mrn" />
    </FormFieldContainer>
  )
}

export { MRNInput }

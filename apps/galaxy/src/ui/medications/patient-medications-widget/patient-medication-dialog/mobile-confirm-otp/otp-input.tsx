'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  NumericInput,
} from '@/components'

const OtpInput = () => {
  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel className="!text-3 font-medium">
        Enter the code here
      </FormFieldLabel>
      <NumericInput
        className="h-10 w-full"
        field="otp"
        allowNegative={false}
        decimalScale={0}
        prefix=""
        maxLimit={1000000}
        placeholder="Enter code here"
      />
      <FormFieldError name="otp" />
    </FormFieldContainer>
  )
}

export { OtpInput }

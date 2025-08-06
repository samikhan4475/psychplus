'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, RadioSelectSection } from '@/components'

interface RadioFieldWithErrorProps {
  field: string
  label: string
  options: { label: string; value: string }[]
  disabled?: boolean
  required?: boolean
  shouldTriggerOnChange?: boolean
}

const RadioFieldWithError = ({
  field,
  label,
  options,
  disabled = false,
  required = false,
  shouldTriggerOnChange = true,
}: RadioFieldWithErrorProps) => {
  return (
    <Flex align="center" gap="2">
      <RadioSelectSection
        field={field}
        label={label}
        options={options}
        disabled={disabled}
        required={required}
        errorField={field}
        shouldTriggerOnChange={shouldTriggerOnChange}
      />
      <FormFieldError name={field} />
    </Flex>
  )
}
export { RadioFieldWithError }

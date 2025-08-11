'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, RadioSelectSection } from '@/components'
import { cn } from '@/utils'

interface RadioFieldWithErrorProps {
  field: string
  label: string
  options: { label: string; value: string }[]
  disabled?: boolean
  required?: boolean
  shouldTriggerOnChange?: boolean
  className?: string
  maxWidthProps?: string
  radioGroupClassName?: string
  errorFieldClassName?: string
  onChange?: (value: string) => void
}

const RadioFieldWithError = ({
  field,
  label,
  options,
  disabled = false,
  required = false,
  shouldTriggerOnChange = true,
  className,
  radioGroupClassName,
  errorFieldClassName,
  onChange,
}: RadioFieldWithErrorProps) => {
  return (
    <Flex gap="2" className={cn('items-center', className)}>
      <RadioSelectSection
        field={field}
        label={label}
        options={options}
        disabled={disabled}
        required={required}
        errorField={field}
        shouldTriggerOnChange={shouldTriggerOnChange}
        radioGroupClassName={radioGroupClassName}
        onChange={onChange}
      />
      <FormFieldError name={field} className={errorFieldClassName} />
    </Flex>
  )
}
export { RadioFieldWithError }

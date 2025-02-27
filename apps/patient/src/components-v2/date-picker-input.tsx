'use client'

import { cn } from '@psychplus-v2/utils'
import { Text, TextFieldInput } from '@radix-ui/themes'
import { DatePickerProps, DateValue } from 'react-aria-components'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldError } from '@/components-v2'

interface DatePickerInputProps<T extends DateValue> extends DatePickerProps<T> {
  label?: string
  field: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

const DatePickerInput = <T extends DateValue>({
  label,
  field,
  isRequired,
  isDisabled,
  className,
}: DatePickerInputProps<T>) => {
  const form = useFormContext()

  return (
    <FormFieldContainer className={cn(className)}>
      {label && (
        <Text as="label" size="1" weight="medium">
          {label}
        </Text>
      )}
      <TextFieldInput
        type="date"
        radius="medium"
        {...form.register(field)}
        className="ml-[-4px] mr-[6px] h-5 w-full text-[13px]"
        disabled={isDisabled}
        required={isRequired}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DatePickerInput }

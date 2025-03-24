'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { cn, preventInvalidZipInput } from '@/utils'

interface AddressTextFieldProps
  extends React.ComponentProps<typeof TextField.Root> {
  label: string
  field: string
  className?: string
  placeholder?: string
  labelClassName?: string
  disabled?: boolean
  fieldContainerClassName?: string
  isZip?: boolean
}
const AddressTextField = ({
  label,
  field,
  className,
  required,
  placeholder,
  labelClassName,
  disabled,
  isZip,
  fieldContainerClassName = 'flex-1',
  ...props
}: AddressTextFieldProps) => {
  const { register, setValue, watch } = useFormContext()

  const { onChange, ...rest } = register(field)

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value
    if (isZip && fieldValue.length > 5) {
      return
    }

    setValue(field, fieldValue, { shouldValidate: true })
  }

  const preventInvalidZipInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      isZip &&
      (event.key === 'e' ||
        event.key === 'E' ||
        event.key === '+' ||
        event.key === '-' ||
        event.key === '.')
    ) {
      event.preventDefault()
    }
  }

  return (
    <FormFieldContainer className={fieldContainerClassName}>
      <FormFieldLabel
        required={required}
        className={cn('!text-1', labelClassName)}
      >
        {label}
      </FormFieldLabel>
      <TextField.Root
        size="1"
        value={watch(field)}
        placeholder={placeholder}
        className={cn(
          'border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]',
          className,
        )}
        onKeyDown={preventInvalidZipInput}
        onChange={handleZipChange}
        disabled={disabled}
        {...props}
        {...rest}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { AddressTextField }

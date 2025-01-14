'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { cn } from '@/utils'

interface AddressTextFieldProps
  extends React.ComponentProps<typeof TextField.Root> {
  label: string
  field: string
  className?: string
  placeholder?: string
  labelClassName?: string
  disabled?: boolean
  isZip?: boolean
  fieldContainerClassName?: string
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

  const { onChange, ...rest } = register(field, { disabled: disabled })

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value
    if (fieldValue.length <= 5) {
      setValue(field, fieldValue, { shouldValidate: true })
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
        onChange={handleZipChange}
        {...props}
        {...rest}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { AddressTextField }

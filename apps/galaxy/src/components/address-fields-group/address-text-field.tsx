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
}
const AddressTextField = ({
  label,
  field,
  className,
  required,
  placeholder,
  labelClassName,
  disabled,
  ...props
}: AddressTextFieldProps) => {
  const { register, setValue, watch } = useFormContext()

  const { onChange, ...rest } = register(field, { disabled: disabled })

  return (
    <FormFieldContainer className="flex-1">
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
        onChange={(e) =>
          setValue(field, e.target.value, { shouldValidate: true })
        }
        {...props}
        {...rest}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { AddressTextField }

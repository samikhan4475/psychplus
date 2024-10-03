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
}
const AddressTextField = ({
  label,
  field,
  className,
  required,
  placeholder,
  labelClassName,
}: AddressTextFieldProps) => {
  const { register, setValue, watch } = useFormContext()

  const { onChange, ...rest } = register(field)

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
        {...rest}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { AddressTextField }

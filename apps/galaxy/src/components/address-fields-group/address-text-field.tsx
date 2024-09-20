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
}
const AddressTextField = ({
  label,
  field,
  className,
  required,
}: AddressTextFieldProps) => {
  const { register, setValue, watch } = useFormContext()

  const { onChange, ...rest } = register(field)

  return (
    <FormFieldContainer className={cn('flex-1', className)}>
      <FormFieldLabel required={required} className="!text-1">
        {label}
      </FormFieldLabel>
      <TextField.Root
        size="1"
        value={watch(field)}
        className={textFieldClassName}
        onChange={(e) => setValue(field, e.target.value)}
        {...rest}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}
const textFieldClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { AddressTextField }

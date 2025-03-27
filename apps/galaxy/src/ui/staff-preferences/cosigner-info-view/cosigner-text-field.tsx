'use client'

import { TextField } from '@radix-ui/themes'
import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { cn } from '@/utils'
import { SchemaType } from '../schema'

interface CosignerTextFieldProps
  extends React.ComponentProps<typeof TextField.Root> {
  label: string
  field: keyof SchemaType
  className?: string
  placeholder?: string
  labelClassName?: string
  disabled?: boolean
  fieldContainerClassName?: string
}
const CosignerTextField = ({
  label,
  field,
  className,
  required,
  placeholder,
  labelClassName,
  disabled,
  ...props
}: CosignerTextFieldProps) => {
  return (
    <FormFieldContainer className={'flex-1'}>
      <FormFieldLabel
        required={required}
        className={cn('!text-1', labelClassName)}
      >
        {label}
      </FormFieldLabel>
      <TextInput
        field={field}
        placeHolder="Enter Text"
        className={cn(
          'border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]',
        )}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { CosignerTextField }

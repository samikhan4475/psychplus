'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { cn } from '@/utils'
import { BlockProps } from '../types'

interface DetailFieldProps extends BlockProps {
  label: string
  field: string
  className?: string
  containerClassName?: string
  maxLength?: number
}

const DetailsField = ({
  label,
  field,
  maxLength,
  disabled = false,
  className,
  containerClassName,
}: DetailFieldProps) => {
  return (
    <FormFieldContainer className={cn('gap-2', containerClassName)}>
      <FormFieldLabel
        required
        className="inline !text-1"
        labelClassName="whitespace-normal"
      >
        {label}
      </FormFieldLabel>
      <AutoResizeInput
        className={cn('min-h-32 w-full max-w-full', className)}
        disabled={disabled}
        field={field}
        maxLength={maxLength}
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { DetailsField }

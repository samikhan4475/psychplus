import React from 'react'
import { Box, Flex, TextFieldInput } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components-v2'

type FormFieldInputProps = {
  placeholder: string
  field: string
  label: string
  required?: boolean
  className?: string
  prefix?: React.ReactNode
  sufix?: React.ReactNode
  type?: string
  max?: string
  disabled?: boolean
}

const FormFieldInput = ({
  label,
  placeholder,
  field,
  required = false,
  className,
  prefix,
  sufix,
  type,
  disabled,
  ...props
}: FormFieldInputProps) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className={className}>
      <FormFieldLabel required={required}>{label}</FormFieldLabel>
      <Flex align="center">
        {sufix && <>{sufix}</>}
        <Box className="w-full">
          <TextFieldInput
            {...form.register(field)}
            type={type || 'text'}
            size="3"
            placeholder={placeholder}
            className="placeholder:text-[16px]"
            disabled={disabled}
            {...props}
          />
        </Box>
        {prefix && <>{prefix}</>}
      </Flex>
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { FormFieldInput }

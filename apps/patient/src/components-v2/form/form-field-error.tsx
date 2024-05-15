'use client'

import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

interface FormFieldErrorProps {
  name: string
}

const FormFieldError = ({ name }: FormFieldErrorProps) => {
  const form = useFormContext()
  const error = form.getFieldState(name, form.formState).error

  return error ? (
    <Text className="ml-1 text-[13px] text-tomato-11">{error.message}</Text>
  ) : null
}

export { FormFieldError }

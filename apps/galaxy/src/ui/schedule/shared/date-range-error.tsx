'use client'

import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'

interface FormFieldErrorProps {
  startDateName: string
  endDateName: string
  className?: string
}

const DateRangeError = ({
  startDateName,
  endDateName,
  className,
}: FormFieldErrorProps) => {
  const form = useFormContext()
  const startDateError = form.getFieldState(startDateName, form.formState).error
  const endDateError = form.getFieldState(endDateName, form.formState).error

  return startDateError || endDateError ? (
    <Text
      className={cn('w-full text-center text-[12px] text-tomato-11', className)}
    >
      {startDateError ? startDateError.message : endDateError?.message}
    </Text>
  ) : null
}

export { DateRangeError }

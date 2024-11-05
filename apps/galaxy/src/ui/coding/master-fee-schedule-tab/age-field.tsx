import React from 'react'
import { NumberInput } from '@/components'
import { cn } from '@/utils'

interface AgeFieldProps {
  field: string
  placeholder?: string
  className?: string
}

const AgeField = ({ field, placeholder, className }: AgeFieldProps) => {
  return (
    <NumberInput
      format="####"
      field={field}
      className={cn(`w-[102px]`, className)}
      placeholder={placeholder}
    />
  )
}

export { AgeField }

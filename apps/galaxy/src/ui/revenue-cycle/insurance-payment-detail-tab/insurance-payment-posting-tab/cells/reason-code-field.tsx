import React, { FormEvent } from 'react'
import { TextField } from '@radix-ui/themes'

interface ReasonCodeProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void
  value: string
}
const ReasonCodeField = ({ onChange, value }: ReasonCodeProps) => {
  return (
    <TextField.Root
      name="reasonCode"
      onChange={onChange}
      value={value}
      variant="soft"
      className="min-w-8 max-w-8 h-4 border border-gray-8 bg-transparent "
      size="1"
    />
  )
}

export { ReasonCodeField }

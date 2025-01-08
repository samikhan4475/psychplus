import React, { FormEvent } from 'react'
import { TextField } from '@radix-ui/themes'

interface RemarkCodeProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void
  value: string
}
const RemarkCodeField = ({ onChange, value }: RemarkCodeProps) => {
  return (
    <TextField.Root
      name="remarkCode"
      onChange={onChange}
      value={value}
      variant="soft"
      className="min-w-8 max-w-8 h-4 border border-gray-8 bg-transparent "
      size="1"
    />
  )
}

export { RemarkCodeField }

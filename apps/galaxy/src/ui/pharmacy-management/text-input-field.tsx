import React from 'react'
import { TextField } from '@radix-ui/themes' // Assuming `TextField` is a correct import

import { string } from 'zod'
import { FormFieldContainer, FormFieldLabel } from '@/components'

interface FormFieldProps {
  label: string
  value: string
  disabled?: boolean
  width?: string
}

const TextInputField = ({
  label,
  value,
  disabled = true,
  width = 'w-[180px]',
}: FormFieldProps) => (
  <FormFieldContainer className="flex flex-col items-start gap-1">
    <FormFieldLabel className="!text-1">{label}</FormFieldLabel>
    <TextField.Root
      size="1"
      disabled={disabled}
      defaultValue={value}
      className={`border-pp-gray-2 ${width} text-pp-black-3 bg-pp-states-disabled h-[36px] border border-solid p-0 text-[16px] !outline-none [box-shadow:none]`}
    />
  </FormFieldContainer>
)

export default TextInputField

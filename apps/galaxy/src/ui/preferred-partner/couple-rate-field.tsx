'use client'

import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const CoupleRateField = () => {
  return (
    <FormFieldContainer className="flex-row gap-1 opacity-60">
      <FormFieldLabel className="!text-1">Rate</FormFieldLabel>
      <TextField.Root
        size="1"
        type="text"
        placeholder="$10"
        className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { CoupleRateField }

'use client'

import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const RemainingInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="flex-column w-auto gap-1">
      <FormFieldLabel className="!text-1">
        Deductible Remaining Amount
      </FormFieldLabel>
      <TextField.Root
        placeholder="$20 | 03/12/24 08:00 | Roger Smith, MD"
        size="1"
        {...form.register('remainingdeductionbalance')}
        className="border-pp-gray-2 h-6 w-[241.4px] border border-solid !outline-none [box-shadow:none]"
      />
    </FormFieldContainer>
  )
}

export { RemainingInput }
